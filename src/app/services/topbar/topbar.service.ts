import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type TopbarContent = Type<unknown> | string | null;

@Injectable({
  providedIn: 'root',
})
export class TopbarService {
  private topbarContent$$ = new BehaviorSubject<TopbarContent>(null);

  get topbarContent$() {
    return this.topbarContent$$.asObservable();
  }

  setTopbarContent(content: TopbarContent) {
    this.topbarContent$$.next(content);
  }
}
