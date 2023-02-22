import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ADMIN_PATHS } from './admin-paths';
import { AdminViewComponent } from './admin-view.component';
import { MovieShowingsComponent } from './repertoire/movie-showings/movie-showings.component';
import { RepertoireComponent } from './repertoire/repertoire.component';
import { RoomsComponent } from './rooms/rooms.component';

@NgModule({
  imports: [
    AdminViewComponent,
    RouterModule.forChild([
      { path: ADMIN_PATHS.default, component: AdminViewComponent },
      { path: ADMIN_PATHS.rooms, component: RoomsComponent },
      { path: ADMIN_PATHS.repertoire, component: RepertoireComponent },
      { path: `${ADMIN_PATHS.repertoire}/:id`, component: MovieShowingsComponent },
    ]),
  ],
})
export class AdminModule {}
