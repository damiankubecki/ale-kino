import { Component, inject } from '@angular/core';
import { TopbarService } from '@app/topbar.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
})
export class HomeViewComponent {
  private topbarService = inject(TopbarService);

  constructor() {
    this.topbarService.setTopbarContent('Repertuar');
  }
}
