import { Component, Input } from '@angular/core';
import { ISocialMediaItem } from 'config';

@Component({
  selector: 'app-social-media-item[item]',
  templateUrl: './social-media-item.component.html',
  styleUrls: ['./social-media-item.component.scss'],
})
export class SocialMediaItemComponent {
  @Input() item!: ISocialMediaItem;
}
