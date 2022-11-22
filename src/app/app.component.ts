import { Component } from '@angular/core';
import { RepertoireService } from './services/repertoire/repertoire.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [RepertoireService],
})
export class AppComponent {
  title = 'ale-kino';
}
