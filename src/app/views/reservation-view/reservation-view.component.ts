import { Component, OnInit } from '@angular/core';
import { TopbarService } from '@app/services/topbar/topbar.service';

@Component({
  selector: 'app-reservation-view',
  templateUrl: './reservation-view.component.html',
  styleUrls: ['./reservation-view.component.scss'],
})
export class ReservationViewComponent {
  title = 'Film';

  constructor(private topbarService: TopbarService) {
    this.topbarService.setTopbarContent('Rezerwacja');
  }
}
