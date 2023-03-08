import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ADMIN_PATHS } from './admin-paths';
import { AdminViewComponent } from './admin-view.component';
import { DiscountCodesComponent } from './discount-codes/discount-codes.component';
import { MovieShowingsComponent } from './movies/movie-showings/movie-showings.component';
import { MoviesComponent } from './movies/movies.component';
import { RoomsComponent } from './rooms/rooms.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    AdminViewComponent,
    RouterModule.forChild([
      { path: ADMIN_PATHS.default, component: AdminViewComponent },
      { path: ADMIN_PATHS.rooms, component: RoomsComponent },
      { path: ADMIN_PATHS.movies, component: MoviesComponent },
      { path: `${ADMIN_PATHS.movies}/:id`, component: MovieShowingsComponent },
      { path: ADMIN_PATHS.settings, component: SettingsComponent },
      { path: ADMIN_PATHS.discountCodes, component: DiscountCodesComponent },
    ]),
  ],
})
export class AdminModule {}
