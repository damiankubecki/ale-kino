import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from '@app/features/auth/login/login-view.component';
import {
  RepertoireViewComponent,
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
import { MyTicketsComponent } from '@app/features/my-tickets/my-tickets.component';
import { WatchlistComponent } from '@app/features/watchlist/watchlist.component';
import { OrdersComponent } from '@app/features/orders/orders.component';

const routes: Routes = [
  {
    path: paths.home,
    canActivate: [IsNotAdminGuard],
    children: [
      { path: paths.home, pathMatch: 'full', component: RepertoireViewComponent },
      { path: `${paths.repertoire}/:date`, pathMatch: 'full', component: RepertoireViewComponent },
      { path: paths.confirmation, component: BuyTicketViewComponent },
      { path: `${paths.reservation}/:id/:day/:hour`, component: ReservationViewComponent },
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
