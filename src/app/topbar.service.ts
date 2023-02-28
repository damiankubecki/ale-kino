import { inject, Injectable } from '@angular/core';
import { ActivationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export type TopbarContent = string | null;

@Injectable({
  providedIn: 'root',
})
export class TopbarService {
  private router = inject(Router);

  private topbarContent$$ = new BehaviorSubject<TopbarContent>(null);

  get topbarContent$() {
    return this.topbarContent$$.asObservable();
  }

  constructor() {
    this.router.events.subscribe({
      next: event => {
        if (event instanceof ActivationStart) {
          this.topbarContent$$.next(null);
        }
      },
    });
  }

  setTopbarContent(content: TopbarContent) {
    this.topbarContent$$.next(content);
  }
}
