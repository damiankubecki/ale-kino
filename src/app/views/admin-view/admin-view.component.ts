import { Component } from '@angular/core';
import { UserService } from '@app/services/user/user.service';
import { Router } from '@angular/router';
import { paths } from 'router/paths';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
})
export class AdminViewComponent {
  constructor(private userService: UserService, private router: Router) {
    this.userService.user$.subscribe(user => {
      if (user.role !== 'admin') {
        this.router.navigate([paths.home]);
      }
    });
  }
}
