import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { ConfigActions } from './core/config/config.actions';
import { ApiService } from './shared/data/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [],
})
export class AppComponent {
  private api = inject(ApiService);
  private store = inject(Store);

  isLoading = true;

  constructor() {
    this.store.dispatch(ConfigActions.getConfig());

    this.api.status$
      .pipe(map(status => status.isLoading))
      .subscribe(isLoading => (this.isLoading = isLoading));
  }
}
