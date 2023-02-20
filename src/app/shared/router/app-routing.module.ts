import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentViewComponent } from '@app/features/purchase/payment-view/payment-view.component';
import {
  RepertoireViewComponent,
  AdminViewComponent,
  BuyTicketViewComponent,
  ReservationViewComponent,
  SummaryViewComponent,
  NotFoundComponent,
  BasketComponent,
  MyTicketsComponent,
  OrdersComponent,
  WatchlistComponent,
  LoginViewComponent,
  LogoutViewComponent,
} from '@app/views';
import { IsAdminGuard, IsNotAdminGuard, IsGuestGuard } from './guards';
import { paths } from './paths';

const routes: Routes = [
  {
    path: paths.home,
    canActivate: [IsNotAdminGuard],
    children: [
      { path: paths.home, pathMatch: 'full', component: RepertoireViewComponent },
      { path: `${paths.repertoire}/:date`, pathMatch: 'full', component: RepertoireViewComponent },
      { path: paths.confirmation, component: BuyTicketViewComponent },
      { path: `${paths.reservation}/:id/:day/:hour`, component: ReservationViewComponent },
      { path: paths.payment, component: PaymentViewComponent },
      { path: `${paths.summary}/:id`, component: SummaryViewComponent },
      { path: paths.basket, component: BasketComponent },
      { path: paths.myTickets, component: MyTicketsComponent },
      { path: `${paths.orders}/:id`, component: OrdersComponent },
      { path: paths.watchlist, component: WatchlistComponent },
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
