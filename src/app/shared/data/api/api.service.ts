import { inject, Injectable, OnInit } from '@angular/core';
import { MoviesService } from '@app/shared/data/movies/movies.service';
import { RepertoireService } from '@app/shared/data/repertoire/repertoire.service';
import { BehaviorSubject, combineLatest, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private repertoireService = inject(RepertoireService);
  private moviesService = inject(MoviesService);

  private status$$ = new BehaviorSubject({ isLoading: true });

  get status$() {
    return this.status$$.asObservable();
  }

  constructor() {
    this.repertoireService.fetchRepertoire();
    this.moviesService.fetchMovies();

    combineLatest([this.moviesService.moviesCollection$, this.repertoireService.repertoire$])
      .pipe(
        tap(([movies, repertoire]) => {
          if (!movies.length || !repertoire.length) return;

          this.status$$.next({ isLoading: false });

          this.moviesService.setMoviesToDisplay(this.repertoireService.dayToDisplay, repertoire);
        })
      )
      .subscribe();
  }
}
