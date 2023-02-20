import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]',
})
export class OnlyNumbersDirective {
  private element = inject(ElementRef);

  @HostListener('input', ['$event']) onInputChange() {
    const initialValue = this.element.nativeElement.value;

    this.element.nativeElement.value = initialValue.replace(/[^0-9]*/g, '');
  }
}
