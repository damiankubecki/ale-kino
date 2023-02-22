import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MoviesService } from '@app/shared/data/movies/movies.service';
import { TopbarService } from '@app/topbar.service';
import { ADMIN_PATHS } from '../admin-paths';
import { AddMovieDialogComponent } from './add-movie-form/add-movie-form.component';

@Component({
  selector: 'app-repertoire',
  standalone: true,
  imports: [RouterModule, MatListModule, NgFor, NgIf, AsyncPipe, AddMovieDialogComponent],
  templateUrl: './repertoire.component.html',
  styleUrls: ['./repertoire.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepertoireComponent {
  private topbarService = inject(TopbarService);
  private moviesService = inject(MoviesService);

  paths = ADMIN_PATHS;
  isFormActive = false;
  moviesCollection$ = this.moviesService.moviesCollection$;

  constructor() {
    this.topbarService.setTopbarContent('Repertuar');
  }

  toggleFormActivity() {
    this.isFormActive = !this.isFormActive;
  }
}
