import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { AppRoutingModule } from '../router/app-routing.module';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { AdminViewComponent } from './views/admin-view/admin-view.component';
import { ReservationViewComponent } from './views/reservation-view/reservation-view.component';
import { BuyTicketViewComponent } from './views/buy-ticket-view/buy-ticket-view.component';
import { SummaryViewComponent } from './views/summary-view/summary-view.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListOfDaysComponent } from './components/subcomponents/list-of-days/list-of-days.component';
import { ListOfMoviesComponent } from './components/subcomponents/list-of-movies/list-of-movies.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    AdminViewComponent,
    ReservationViewComponent,
    BuyTicketViewComponent,
    SummaryViewComponent,
    HeaderComponent,
    FooterComponent,
    ListOfDaysComponent,
    ListOfMoviesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
