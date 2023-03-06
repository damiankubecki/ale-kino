import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[noWhitespace]',
})
export class NoWhitespaceDirective {
  private element = inject(ElementRef);

  @HostListener('input', ['$event']) onInputChange() {
    const initialValue = this.element.nativeElement.value;

    this.element.nativeElement.value = initialValue.trim();
  }
}
