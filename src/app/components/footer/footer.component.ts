import { Component } from '@angular/core';
import { config, IFooterLinkItem, ISocialMediaItem } from 'config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  socialMediaItems: ISocialMediaItem[] = config.socialMedia.filter(item => item.inFooter);
  otherLinks: IFooterLinkItem[] = config.footerLinks;
}
