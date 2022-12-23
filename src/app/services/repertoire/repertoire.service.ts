import { inject, Injectable } from '@angular/core';
import { IRepertoireForMovie } from '@myTypes/interfaces';
import { LongDate } from '@myTypes/types';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { config } from 'config';
import { API_URL, REPERTOIRE_ENDPOINT } from 'api';

@Injectable({
  providedIn: 'root',
})
export class RepertoireService {
  private http = inject(HttpClient);

  private dayToDisplay$$ = new BehaviorSubject<LongDate>(config.repertoire.dayToDisplayOnInit);
  private repertoire$$ = new BehaviorSubject<IRepertoireForMovie[]>([]);

  get dayToDisplay$() {
    return this.dayToDisplay$$.asObservable();
  }

  get dayToDisplay() {
    return this.dayToDisplay$$.value;
  }

  get repertoire$() {
    return this.repertoire$$.asObservable();
  }

  get repertoire() {
    return this.repertoire$$.value;
  }

  constructor() {
    this.fetchRepertoire();
  }

  setDayToDisplay(date: LongDate) {
    this.dayToDisplay$$.next(date);
  }

  private fetchRepertoire() {
    const observableResult = this.http.get<IRepertoireForMovie[]>(
      `${API_URL}/${REPERTOIRE_ENDPOINT}`
    );

    observableResult.subscribe({
      next: response => {
        this.repertoire$$.next(response);
      },
    });

    return observableResult;
  }
}
