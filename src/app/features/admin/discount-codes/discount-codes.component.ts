import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule, MatInputModule } from '@angular/material';
import { DiscountActions } from '@app/features/purchase/shared/discount-codes/discount-codes.actions';
import { DiscountCode } from '@app/features/purchase/shared/discount-codes/discount-codes.interface';
import { selectDiscountCodes } from '@app/features/purchase/shared/discount-codes/discount-codes.selectors';
import { NoWhitespaceStandaloneDirective } from '@app/shared/directives/no-whitespace-standalone.directive';
import { TopbarService } from '@app/topbar.service';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

export type Form = FormGroup<{
  name: FormControl<string>;
  discount: FormControl<string>;
}>;

@Component({
  selector: 'app-discount-codes',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    NoWhitespaceStandaloneDirective,
  ],
  templateUrl: './discount-codes.component.html',
  styleUrls: ['./discount-codes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscountCodesComponent {
  private builder = inject(NonNullableFormBuilder);
  private store = inject(Store);
  private topbarService = inject(TopbarService);

  editedCode$$ = new BehaviorSubject<DiscountCode | null>(null);
  discountCodes$ = this.store.select(selectDiscountCodes);

  form: Form = this.createForm();

  constructor() {
    this.topbarService.setTopbarContent('Kody zniżkowe');
    this.store.dispatch(DiscountActions.getDiscountCodes());
  }

  openCodeEditor(discountCode: DiscountCode) {
    this.editedCode$$.next(discountCode);
    this.form.patchValue({
      name: discountCode.name,
      discount: discountCode.discount.toString(),
    });
  }

  closeCodeEditor() {
    this.editedCode$$.next(null);
    this.form.patchValue({ name: '', discount: '' });
  }

  deleteCode(id: DiscountCode['id']) {
    this.store.dispatch(DiscountActions.deleteDiscountCode({ id }));
  }

  submitForm() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const { name, discount } = this.form.value;
    if (!name || !discount) return;

    if (this.editedCode$$.value) {
      this.store.dispatch(
        DiscountActions.editDiscountCode({
          discountCode: { id: this.editedCode$$.value.id, name, discount: Number(discount) },
        })
      );
    } else {
      this.store.dispatch(
        DiscountActions.addDiscountCode({ discountCode: { name, discount: Number(discount) } })
      );
    }
    this.form.reset();
    this.closeCodeEditor();
  }

  private createForm() {
    const create = this.builder;

    const form: Form = create.group({
      name: create.control('', { validators: [Validators.required] }),
      discount: create.control('', {
        validators: [Validators.required, Validators.min(1), Validators.max(100)],
      }),
    });
    return form;
  }
}
