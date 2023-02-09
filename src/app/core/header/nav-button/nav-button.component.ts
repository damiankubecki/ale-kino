import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IMenuItem {
  title: string;
  path: string;
}

@Component({
  selector: 'app-nav-button',
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.scss'],
})
export class NavButtonComponent {
  @Input() icon: IconProp | null = null;
  @Input() menuItems: IMenuItem[] | null = null;
  @Input() link : string | null = null;
}
