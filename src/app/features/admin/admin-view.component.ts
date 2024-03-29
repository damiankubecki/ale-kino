import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopbarService } from '@app/topbar.service';
import { ADMIN_PATHS } from './admin-paths';

@Component({
  selector: 'app-admin-view',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminViewComponent {
  private topbarService = inject(TopbarService);

  paths = ADMIN_PATHS;

  constructor() {
    this.topbarService.setTopbarContent('Administrator');
  }
}
