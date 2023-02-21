import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ADMIN_PATHS } from './admin-paths';
import { AdminViewComponent } from './admin-view.component';
import { RepertoireComponent } from './repertoire/repertoire.component';
import { RoomsComponent } from './rooms/rooms.component';

@NgModule({
  imports: [
    AdminViewComponent,
    RouterModule.forChild([
      { path: ADMIN_PATHS.default, component: AdminViewComponent },
      { path: ADMIN_PATHS.rooms, component: RoomsComponent },
      { path: ADMIN_PATHS.repertoire, component: RepertoireComponent },
    ]),
  ],
})
export class AdminModule {}
