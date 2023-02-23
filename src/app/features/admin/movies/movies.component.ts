import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIcon, MatIconModule, MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MoviesService } from '@app/shared/data/movies/movies.service';
import { IMovie } from '@app/shared/types/interfaces';
import { TopbarService } from '@app/topbar.service';
import { Observable, tap } from 'rxjs';
import { ADMIN_PATHS } from '../admin-paths';
import { AddMovieFormComponent } from './add-movie-form/add-movie-form.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    RouterModule,
    MatListModule,
    MatIconModule,
    NgFor,
    NgIf,
    AsyncPipe,
    AddMovieFormComponent,
  ],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesComponent {
  private topbarService = inject(TopbarService);
  private moviesService = inject(MoviesService);

  paths = ADMIN_PATHS;
  isFormActive = false;
  moviesCollection$ = this.moviesService.moviesCollection$;

  constructor() {
    this.topbarService.setTopbarContent('Filmy');
  }

  toggleFormActivity() {
    this.isFormActive = !this.isFormActive;
  }

  addMovie(movie: IMovie) {
    this.moviesService
      .addMovie(movie)
      .pipe(tap(() => window.location.reload()))
      .subscribe();
  }

  deleteMovie(movieId: number) {
    const confimration = window.confirm('Czy na pewno chcesz usunąć film?');

    if (confimration) {
      this.moviesService
        .deleteMovie(movieId)
        .pipe(tap(() => window.location.reload()))
        .subscribe();
    }
  }
}
