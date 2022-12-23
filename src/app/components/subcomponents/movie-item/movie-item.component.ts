import { Component, inject, Input, OnInit } from '@angular/core';
import { IMovieExpanded } from '@app/services/movies/movies.service';
import { UserService } from '@app/services/user/user.service';
import { paths } from 'router/paths';

@Component({
  selector: 'app-movie-item[movie]',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent implements OnInit {
  @Input() movie!: IMovieExpanded;

  private userService = inject(UserService);

  isUserLogged: boolean = true;
  paths = paths;

  ngOnInit() {
    // this.isUserLogged = this.userService.isUser;
  }

  toggleFullDescriptionActivity() {
    this.movie.isFullDescriptionActive = !this.movie?.isFullDescriptionActive;
  }
}
