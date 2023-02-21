import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopbarService } from '@app/topbar.service';

@Component({
  selector: 'app-repertoire',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './repertoire.component.html',
  styleUrls: ['./repertoire.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepertoireComponent {
  private topbarService = inject(TopbarService);

  constructor() {
    this.topbarService.setTopbarContent('Repertuar');
  }
}
