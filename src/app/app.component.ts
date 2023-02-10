import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from './shared/data/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [],
})
export class AppComponent {
  private api = inject(ApiService);

  isLoading = true;

  constructor() {
    this.api.status$
      .pipe(map(status => status.isLoading))
      .subscribe(isLoading => (this.isLoading = isLoading));
  }
}
