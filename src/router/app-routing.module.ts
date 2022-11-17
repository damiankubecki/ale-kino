import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  HomeViewComponent,
  AdminViewComponent,
  BuyTicketViewComponent,
  ReservationViewComponent,
  SummaryViewComponent,
} from '@app/views/views';
import paths from './paths';

const routes: Routes = [
  { path: paths.home, component: HomeViewComponent },
  { path: paths.admin, component: AdminViewComponent },
  { path: paths.buyTicket, component: BuyTicketViewComponent },
  { path: paths.reservation, component: ReservationViewComponent },
  { path: paths.summary, component: SummaryViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
