import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './shared/router/app-routing.module';
import { RepertoireViewComponent } from './features/home/repertoire-view.component';
import { ReservationViewComponent } from './features/purchase/reservation/reservation-view.component';
import { BuyTicketViewComponent } from './features/purchase/confirmation/confirmation-view.component';
import { SummaryViewComponent } from './features/purchase/summary/summary-view.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { ListOfDaysComponent } from './features/home/list-of-days/list-of-days.component';
import { ListOfMoviesComponent } from './features/home/list-of-movies/list-of-movies.component';
import { MainComponent } from './core/layout/main/main.component';
import { MovieItemComponent } from './features/home/movie-item/movie-item.component';
import { SocialMediaItemComponent } from './core/layout/footer/social-media-item/social-media-item.component';
import { NavButtonComponent } from './core/layout/header/nav-button/nav-button.component';
import { LoginViewComponent } from './features/auth/login/login-view.component';
import { LogoutViewComponent } from './features/auth/logout/logout-view.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { ApiService } from './shared/data/api/api.service';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { BasketComponent } from './features/purchase/basket/basket.component';
import { OrderItemsListComponent } from './features/purchase/shared/order-items-list/order-items-list.component';
import { MyTicketsComponent } from './features/my-tickets/my-tickets.component';
import { WatchlistComponent } from './features/watchlist/watchlist.component';
import { OrdersComponent } from './features/orders/orders.component';
import { ConfirmationFormComponent } from './features/purchase/confirmation/confirmation-form/confirmation-form.component';
import { OnlyNumbersDirective } from './shared/directives/only-numbers.directive';
import { PaymentViewComponent } from './features/purchase/payment-view/payment-view.component';
import { configReducer } from './core/config/config.reducer';
import { ConfigEffects } from './core/config/config.effects';

@NgModule({
  declarations: [
    AppComponent,
    RepertoireViewComponent,
    ReservationViewComponent,
    BuyTicketViewComponent,
    SummaryViewComponent,
    HeaderComponent,
    FooterComponent,
    ListOfDaysComponent,
    ListOfMoviesComponent,
    MainComponent,
    MovieItemComponent,
    SocialMediaItemComponent,
    NavButtonComponent,
    LoginViewComponent,
    LogoutViewComponent,
    ButtonComponent,
    NotFoundComponent,
    BasketComponent,
    OrderItemsListComponent,
    MyTicketsComponent,
    WatchlistComponent,
    OrdersComponent,
    ConfirmationFormComponent,
    OnlyNumbersDirective,
    PaymentViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({ config: configReducer }),
    EffectsModule.forRoot([ConfigEffects]),
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
