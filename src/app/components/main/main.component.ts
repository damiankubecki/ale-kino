import { Component, Type } from '@angular/core';
import { TopbarContent, TopbarService } from '@app/services/topbar/topbar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  topbarContent: TopbarContent = null;

  // używany tylko gdy wiem, że zmienna będzie komponentem - po sprawdzeniu czy nie jest stringiem i null
  get forceComponent() {
    return this.topbarContent as Type<any>;
  }

  constructor(private topbarService: TopbarService) {
    this.topbarService.topbarContent$.subscribe({
      next: content => {
        this.topbarContent = content;
      },
    });
  }
}
