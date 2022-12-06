import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/services/user/user.service';
import paths from 'router/paths';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
})
export class HomeViewComponent {
  constructor(private userService: UserService, private router: Router) {
    this.userService.USER_DATA.subscribe(user => {
      if (user?.type === 'admin') {
        this.router.navigate([paths.admin]);
      }
    });
  }
}
