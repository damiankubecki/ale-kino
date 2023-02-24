import { Component, inject } from '@angular/core';
import { config, ISocialMediaItem } from '@app/config';
import { Store } from '@ngrx/store';
import { selectFooterLinks } from '../config/config.selectors';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  private store = inject(Store);

  socialMediaItems: ISocialMediaItem[] = config.socialMedia.filter(item => item.inFooter);

  links$ = this.store.select(selectFooterLinks);
}
