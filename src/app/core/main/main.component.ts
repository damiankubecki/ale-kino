import { Component } from '@angular/core';
import { TopbarContent, TopbarService } from '@app/topbar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  topbarContent: TopbarContent = null;

  constructor(private topbarService: TopbarService) {
    this.topbarService.topbarContent$.subscribe({
      next: content => {
        this.topbarContent = content;
      },
    });
  }
}
