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
import { BehaviorSubject, tap } from 'rxjs';

export type Form = FormGroup<{
  date: FormControl<LongDate | null>;
  hour: FormControl<Hour>;
  room: FormControl<number | null>;
}>;

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
  repertoire: IMovieRepertoire | undefined;
  rooms$ = this.roomsService.getAllRooms();

  hours$$ = new BehaviorSubject<Hour[]>([]);
  showingFormControl = new FormControl('');
  form = this.createForm();
  now = new Date().toISOString().substring(0, 10);

  constructor() {
    this.topbarService.setTopbarContent('Seanse');

    this.activatedRoute.params
      .pipe(
        tap(params => {
          const movieId = Number(params['id']);

          this.movie = this.moviesService.getMovieById(movieId);
          this.repertoire = this.repertoireService.getMovieRepertoire(movieId);
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

    if (newHour && !this.hours$$.value.includes(newHour))
      this.hours$$.next([...this.hours$$.value, newHour]);
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
