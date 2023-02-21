import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminViewComponent } from './admin-view.component';

@NgModule({
  imports: [
    AdminViewComponent,
    RouterModule.forChild([{ path: '', component: AdminViewComponent }]),
  ],
})
export class AdminModule {}
