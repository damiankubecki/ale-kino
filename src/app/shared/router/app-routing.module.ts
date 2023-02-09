import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from '@app/features/auth/login/login-view.component';
import {
  HomeViewComponent,
  AdminViewComponent,
  BuyTicketViewComponent,
  ReservationViewComponent,
  SummaryViewComponent,
  NotFoundComponent,
} from '@app/views';
import { IsAdminGuard } from './guards/is-admin.guard';
import { IsNotAdminGuard } from './guards/is-not-admin.guard';
import { IsGuestGuard } from './guards/is-guest.guard';
import { paths } from './paths';
import { LogoutViewComponent } from '@app/features/auth/logout/logout-view.component';
import { BasketComponent } from '@app/features/purchase/basket/basket.component';

const routes: Routes = [
  {
    path: paths.home,
    canActivate: [IsNotAdminGuard],
    children: [
      { path: paths.home, component: HomeViewComponent },
      { path: paths.buyTicket, component: BuyTicketViewComponent },
      { path: `${paths.reservation}/:id/:day/:hour`, component: ReservationViewComponent },
      { path: paths.summary, component: SummaryViewComponent },
      { path: paths.basket, component: BasketComponent },
    ],
  },
  {
    path: paths.admin,
    canActivate: [IsAdminGuard],
    component: AdminViewComponent,
  },
  {
    path: paths.login,
    canActivate: [IsGuestGuard],
    component: LoginViewComponent,
  },
  { path: paths.logout, component: LogoutViewComponent },
  { path: paths.notFound, component: NotFoundComponent },
  { path: '**', redirectTo: paths.notFound },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
