import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MoviesService } from '@app/shared/data/movies/movies.service';
import { RepertoireService } from '@app/shared/data/repertoire/repertoire.service';
import { RoomsService } from '@app/shared/data/rooms/rooms.service';
import { IMovie, IMovieRepertoire, OccupiedSeats, IShowing } from '@app/shared/types/interfaces';
import { Hour, LongDate } from '@app/shared/types/types';
import { TopbarService } from '@app/topbar.service';
import * as moment from 'moment';
import { BehaviorSubject, map, tap } from 'rxjs';

export type Form = FormGroup<{
  date: FormControl<LongDate | null>;
  hour: FormControl<Hour>;
  room: FormControl<number | null>;
}>;

export interface ExisitingShowingHour {
  hour: Hour;
  duration: number;
}

@Component({
  selector: 'app-movie-showings',
  standalone: true,
  imports: [
    RouterModule,
    NgIf,
    NgFor,
    AsyncPipe,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './movie-showings.component.html',
  styleUrls: ['./movie-showings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieShowingsComponent {
  private builder = inject(NonNullableFormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private topbarService = inject(TopbarService);
  private moviesService = inject(MoviesService);
  private repertoireService = inject(RepertoireService);
  private roomsService = inject(RoomsService);

  movie: IMovie | undefined;
  movieRepertoire: IMovieRepertoire | undefined;
  repertoire = this.repertoireService.repertoire;
  rooms$ = this.roomsService.getAllRooms();

  hours$$ = new BehaviorSubject<Hour[]>([]);
  form = this.createForm();
  now = new Date().toISOString().substring(0, 10);
  isHourInputActive = false;

  existingShowingsHours: ExisitingShowingHour[] = [];

  constructor() {
    this.topbarService.setTopbarContent('Seanse');

    this.form.valueChanges
      .pipe(
        tap(values => {
          this.form.value.date = values.date?.split('-').reverse().join('/') as LongDate;

          if (values.date && values.room) {
            this.isHourInputActive = true;

            this.existingShowingsHours = this.getExistingShowingsHours(
              this.repertoire,
              values.date,
              values.room
            );
          }
        })
      )
      .subscribe();

    this.activatedRoute.params
      .pipe(
        tap(params => {
          const movieId = Number(params['id']);

          this.movie = this.moviesService.getMovieById(movieId);
          this.movieRepertoire = this.repertoireService.getMovieRepertoire(movieId);
        })
      )
      .subscribe();
  }

  submit() {
    this.form.markAllAsTouched();

    if (!this.hours$$.value.length) return window.alert('Podaj przynajmniej jedną godzinę seansu');
    if (this.form.invalid) return;

    const occupiedSeatsIds: OccupiedSeats[] = [];

    this.hours$$.value.forEach(hour => {
      const obj = {
        [hour]: [],
      };

      occupiedSeatsIds.push(obj);
    });

    const showing: IShowing = {
      day: this.form.value.date?.split('-').reverse().join('/') as LongDate,
      hours: this.hours$$.value,
      occupiedSeatsIds,
      roomId: this.form.value.room as number,
    };

    this.repertoireService
      .addShowing(this.movie!.id, showing)
      .pipe(tap(() => window.location.reload()))
      .subscribe();
  }

  removeShowing(day: LongDate) {
    this.repertoireService
      .removeShowing(this.movie!.id, day)
      .pipe(tap(() => window.location.reload()))
      .subscribe();
  }

  addHour() {
    const newHour = this.form.value.hour;
    const day = this.form.value.date?.split('-').reverse().join('/') as LongDate;
    const room = this.form.value.room;
    const duration = this.movie?.duration;
    let isValid = false;

    const inputShowingStart = moment(newHour, 'HH:mm');
    const inputShowingEnd = moment(newHour, 'HH:mm').add(duration, 'minutes');

    const showingsHours = this.getExistingShowingsHours(this.repertoire, day, Number(room));

    if (!showingsHours.length) {
      isValid = true;
    }

    showingsHours.forEach((item, index) => {
      const currentShowingStart = moment(item.hour, 'HH:mm');
      const currentShowingEnd = moment(item.hour, 'HH:mm').add(item.duration, 'minutes');

      if (index === showingsHours.length - 1) {
        const lastShowingEnd = moment(showingsHours[index - 1].hour, 'HH:mm').add(
          item.duration,
          'minutes'
        );

        if (
          inputShowingStart.isAfter(currentShowingEnd) ||
          (inputShowingStart.isAfter(lastShowingEnd) &&
            inputShowingEnd.isBefore(currentShowingStart))
        ) {
          isValid = true;
        }
      } else if (index === 0) {
        if (inputShowingEnd.isBefore(currentShowingStart)) {
          isValid = true;
        }
      } else {
        const lastShowingEnd = moment(showingsHours[index - 1].hour, 'HH:mm').add(
          item.duration,
          'minutes'
        );

        if (
          inputShowingStart.isAfter(lastShowingEnd) &&
          inputShowingEnd.isBefore(currentShowingStart)
        ) {
          isValid = true;
        }
      }
    });

    if (newHour)
      if (!isValid || this.hours$$.value.includes(newHour)) {
        window.alert('Podana godzina koliduje z istniejącym seansem');
      } else {
        this.hours$$.next([...this.hours$$.value, newHour]);
      }
  }

  clearHours() {
    this.hours$$.next([]);
  }

  private getExistingShowingsHours(
    repertoire: IMovieRepertoire[],
    day: LongDate,
    room: number
  ): ExisitingShowingHour[] {
    const showings = repertoire.map(item => ({
      hours: item.showings
        .filter(showing => showing.day === day && showing.roomId === room)
        .map(item => item.hours)
        .flat(),
      duration: this.moviesService.getMovieById(item.movieId)?.duration,
    }));

    const currentAddedHours: ExisitingShowingHour[] = this.hours$$.value.map(hour => ({
      hour,
      duration: this.movie!.duration,
    }));

    return [
      ...currentAddedHours,
      ...(showings
        .reduce((acc: Hour[], current) => {
          return [...acc, ...current.hours];
        }, [])
        .map(hour => {
          return {
            hour,
            duration: showings.find(showing => showing.hours.includes(hour))?.duration,
          };
        }) as ExisitingShowingHour[]),
    ].sort((a, b) => {
      return moment(a.hour, 'HH:mm').diff(moment(b.hour, 'HH:mm'));
    });
  }

  private createForm() {
    const create = this.builder;

    const form: Form = create.group({
      date: create.control<LongDate | null>(null, { validators: [Validators.required] }),
      hour: create.control<Hour>('12:00'),
      room: create.control<number | null>(null, { validators: [Validators.required] }),
    });

    return form;
  }
}
