import { Component, inject } from '@angular/core';
import { ListOfDaysComponent } from '@app/components/subcomponents/list-of-days/list-of-days.component';
import { TopbarService } from '@app/services/topbar/topbar.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
})
export class HomeViewComponent {
  private topbarService = inject(TopbarService);

  constructor() {
    this.topbarService.setTopbarContent(ListOfDaysComponent);
  }
}
