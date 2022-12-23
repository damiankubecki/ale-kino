import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ListOfDaysComponent } from '@app/components/subcomponents/list-of-days/list-of-days.component';
import { TopbarService } from '@app/services/topbar/topbar.service';
import { UserService } from '@app/services/user/user.service';
import { paths } from 'router/paths';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
})
export class HomeViewComponent {
  private userService = inject(UserService);
  private topbarService = inject(TopbarService);
  private router = inject(Router);

  constructor() {
    this.topbarService.setTopbarContent(ListOfDaysComponent);

    this.userService.user$.subscribe(user => {
      if (user.role === 'admin') {
        this.router.navigate([paths.admin]);
      }
    });
  }
}
