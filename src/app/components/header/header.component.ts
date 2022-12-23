import { Component, inject, OnInit } from '@angular/core';
import { IUser, UserService } from '@app/services/user/user.service';
import { config, IHeaderActionMenu } from 'config';
import { paths } from 'router/paths';
import { icons } from 'assets/icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private userService = inject(UserService);

  user: IUser = { role: 'guest', info: null };
  actionMenu: IHeaderActionMenu = config.headerActionMenu;
  paths = paths;
  icons = icons;

  ngOnInit() {
    this.userService.user$.subscribe({
      next: user => {
        this.user = user;
      },
    });
  }
}
