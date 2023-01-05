import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  HomeViewComponent,
  AdminViewComponent,
  BuyTicketViewComponent,
  ReservationViewComponent,
  SummaryViewComponent,
} from '@app/views/views';
import { IsAdminGuard } from './guards/is-admin.guard';
import { IsNotAdminGuard } from './guards/is-not-admin.guard';
import { paths } from './paths';

const routes: Routes = [
  {
    path: paths.home,
    canActivate: [IsNotAdminGuard],
    children: [
      { path: paths.home, component: HomeViewComponent },
      { path: paths.buyTicket, component: BuyTicketViewComponent },
      { path: `${paths.reservation}/:id/:day/:hour`, component: ReservationViewComponent },
      { path: paths.summary, component: SummaryViewComponent },
    ],
  },
  {
    path: paths.admin,
    canActivate: [IsAdminGuard],
    component: AdminViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
