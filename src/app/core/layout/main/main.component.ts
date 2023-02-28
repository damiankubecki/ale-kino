import { Component, inject } from '@angular/core';
import { TopbarService } from '@app/topbar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  private topbarService = inject(TopbarService);

  topbarContent$ = this.topbarService.topbarContent$;
}
