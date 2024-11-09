import { Directive, ElementRef, HostListener, Input, Optional, Renderer2 } from '@angular/core';
import { NgModel } from '@angular/forms';


@Directive({
  selector: '[appOnlyNaturalNumbers]',
  standalone: true,
})
export class OnlyNaturalNumbersDirective {
  @Input() min: number | null = null;
  @Input() max: number | null = null;
  constructor(private el: ElementRef,
    private renderer: Renderer2,
    @Optional() private ngModel: NgModel
  ) {}

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace',
      'Tab',
      'End',
      'Home',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
    ];

    if (
      allowedKeys.includes(event.key) ||
      (event.key === '-' && this.min && this.min < 0)
    ) {
      return; // Allow control and arrow keys, negative sign if min < 0
    }

    // Allow numbers (0-9)
    if (event.key >= '0' && event.key <= '9') {
      return;
    }

    // Block all other keys
    event.preventDefault();
  }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = this.el.nativeElement as HTMLInputElement;
    const value = input.value;

    // Remove any non-numeric characters
    input.value = value.replace(/[^0-9.-]/g, '');

    // Parse the number and enforce min/max
    let numericValue = parseFloat(input.value);

    if (isNaN(numericValue)) {
      numericValue = 0; // Default to 0 if the parsed value is NaN
    }

    if (this.min !== null && numericValue < this.min) {
      numericValue = this.min;
    } else if (this.max !== null && numericValue > this.max) {
      numericValue = this.max;
    }

    // Update the input value and ngModel to reflect min/max adjustments
    this.renderer.setProperty(this.el.nativeElement, 'value', numericValue);

    if (this.ngModel) {
      this.ngModel.control.setValue(numericValue);
    }
  }
}
