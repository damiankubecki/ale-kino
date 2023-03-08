import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { NoWhitespaceStandaloneDirective } from '@app/shared/directives/no-whitespace-standalone.directive';
import { IMovie } from '@app/shared/types/interfaces';

export type Form = FormGroup<{
  title: FormControl<string>;
  shortDescription: FormControl<string>;
  longDescription: FormControl<string>;
  imageURL: FormControl<string>;
  duration: FormControl<string>;
  minAge: FormControl<string>;
  genre: FormControl<string>;
  isPremiere: FormControl<boolean>;
}>;

@Component({
  selector: 'app-add-movie-form',
  standalone: true,
  imports: [
    RouterModule,
    MatListModule,
    MatDialogModule,
    NgIf,
    NgFor,
    AsyncPipe,
    NoWhitespaceStandaloneDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './add-movie-form.component.html',
  styleUrls: ['./add-movie-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMovieFormComponent {
  @Output() formValues = new EventEmitter();

  private builder = inject(NonNullableFormBuilder);

  form!: Form;
  genres: string[] = [];

  constructor() {
    this.form = this.createForm();
  }

  handleSubmit() {
    const { title, shortDescription, longDescription, isPremiere, duration, minAge, imageURL } =
      this.form.value;

    this.form.markAllAsTouched();

    if (
      !title?.trim() ||
      !shortDescription?.trim() ||
      !longDescription?.trim() ||
      !duration?.trim() ||
      !minAge?.trim()
    )
      window.alert('Pola nie mogą być wypełnione spacjami');

    if (this.form.invalid) return;

    const movieDTO: Partial<Omit<IMovie, 'id'>> = {
      title,
      description: {
        short: shortDescription as string,
        long: longDescription as string,
      },
      isPremiere,
      duration: Number(duration),
      minAge: Number(minAge) || null,
      imageURL,
      genres: this.genres,
    };

    this.formValues.emit(movieDTO);
  }

  addGenre() {
    const genre = this.form.value.genre;

    if (genre && !this.genres.includes(genre)) {
      this.form.value.genre = '';
      this.genres.push(genre);
    }
  }

  removeGenre(genre: string) {
    this.genres = this.genres.filter(genreItem => genreItem !== genre);
  }

  private createForm() {
    const create = this.builder;

    const form: Form = create.group({
      title: create.control('', { validators: [Validators.required] }),
      shortDescription: create.control('', { validators: [Validators.required] }),
      longDescription: create.control('', { validators: [Validators.required] }),
      imageURL: create.control(''),
      duration: create.control('', { validators: [Validators.required] }),
      minAge: create.control(''),
      genre: create.control(''),
      isPremiere: create.control(false),
    });

    return form;
  }
}
