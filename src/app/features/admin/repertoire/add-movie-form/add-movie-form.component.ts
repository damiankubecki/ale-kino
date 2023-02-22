import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule, MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-movie-form',
  standalone: true,
  imports: [RouterModule, MatListModule, MatDialogModule, NgFor, AsyncPipe],
  templateUrl: './add-movie-form.component.html',
  styleUrls: ['./add-movie-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMovieDialogComponent {}
