import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopbarService } from '@app/topbar.service';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsComponent {
  private topbarService = inject(TopbarService);

  constructor() {
    this.topbarService.setTopbarContent('Sale kinowe');
  }
}
