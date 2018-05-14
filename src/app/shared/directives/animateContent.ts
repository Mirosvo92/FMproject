import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appAnimateContent]'
})
export class AnimateContentDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    setTimeout(() => {
      this.renderer.addClass(this.elementRef.nativeElement, 'animate-active');
    }, 750);
  }
}
