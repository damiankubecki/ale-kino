import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ADMIN_PATHS } from './admin-paths';
import { AdminViewComponent } from './admin-view.component';
import { MovieShowingsComponent } from './movies/movie-showings/movie-showings.component';
import { MoviesComponent } from './movies/movies.component';
import { RoomsComponent } from './rooms/rooms.component';

@NgModule({
  imports: [
    AdminViewComponent,
    RouterModule.forChild([
      { path: ADMIN_PATHS.default, component: AdminViewComponent },
      { path: ADMIN_PATHS.rooms, component: RoomsComponent },
      { path: ADMIN_PATHS.movies, component: MoviesComponent },
      { path: `${ADMIN_PATHS.movies}/:id`, component: MovieShowingsComponent },
    ]),
  ],
})
export class AdminModule {}
