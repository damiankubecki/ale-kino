import { inject, Injectable } from '@angular/core';
import { ActivationStart, Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

export type TopbarContent = string;

@Injectable({
  providedIn: 'root',
})
export class TopbarService {
  private router = inject(Router);

  private topbarContent$$ = new BehaviorSubject<TopbarContent>('');

  get topbarContent$() {
    return this.topbarContent$$.asObservable();
  }

  constructor() {
    this.router.events
      .pipe(
        tap(event => {
          if (event instanceof ActivationStart) {
            this.topbarContent$$.next('');
          }
        })
      )
      .subscribe();
  }

  setTopbarContent(content: TopbarContent) {
    this.topbarContent$$.next(content);
  }
}
