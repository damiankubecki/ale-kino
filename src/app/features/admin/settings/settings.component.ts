import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material';
import { ConfigActions } from '@app/core/config/config.actions';
import { ConfigState } from '@app/core/config/config.interface';
import { selectFooterLinks, selectConfig } from '@app/core/config/config.selectors';
import { TopbarService } from '@app/topbar.service';
import { Store } from '@ngrx/store';
import { map, skip } from 'rxjs';

export type Form = FormGroup<{
  dayToDisplayOnInit: FormControl<string>;
  numberOfDaysToDisplay: FormControl<string>;
  footerName: FormControl<string>;
  footerLink: FormControl<string>;
}>;

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, MatIconModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  private store = inject(Store);
  private builder = inject(NonNullableFormBuilder);
  private topbarService = inject(TopbarService);

  footerLinks$ = this.store.select(selectFooterLinks);
  form$ = this.store.select(selectConfig).pipe(
    skip(1),
    map(config => this.createForm(config))
  );

  constructor() {
    this.topbarService.setTopbarContent('Ustawienia');

    this.store.dispatch(ConfigActions.getConfig());
  }

  setDayToDisplayOnInit(control: FormControl<string>) {
    const value = Number(control.value);

    if (value >= 0) {
      this.store.dispatch(ConfigActions.setDayToDisplayOnInit({ daysFromToday: value }));
    } else window.alert('Wyświetlany dzień nie może być przeszły');
  }

  setNumberOfDaysToDisplay(control: FormControl<string>) {
    const value = Number(control.value);

    if (value >= 7) {
      this.store.dispatch(
        ConfigActions.setNumberOfDaysToDisplay({
          daysNumber: value,
        })
      );
    } else window.alert('Liczba dni nie może być mniejsza niż 7');
  }

  addFooterLink({ name, link }: { name: FormControl<string>; link: FormControl<string> }) {
    const nameValue = name.value;
    const linkValue = link.value;

    if (nameValue && linkValue) {
      this.store.dispatch(
        ConfigActions.addFooterLink({ link: { link: linkValue, name: nameValue } })
      );
    }
  }

  deleteFooterLink(name: string) {
    this.store.dispatch(ConfigActions.deleteFooterLink({ name }));
  }

  private createForm(config: ConfigState | null) {
    const create = this.builder;

    const form: Form = create.group({
      dayToDisplayOnInit: create.control(config?.dayToDisplayOnInit.toString() || ''),
      numberOfDaysToDisplay: create.control(config?.numberOfDaysToDisplay.toString() || ''),
      footerName: create.control(''),
      footerLink: create.control(''),
    });

    return form;
  }
}
