import {Injectable, Renderer2, RendererFactory2} from '@angular/core';

@Injectable()
export class OpenWindowSingIn {

  renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  open() {
    const element = this.renderer.selectRootElement('.user-link__list-item-link');
    this.renderer.addClass(element, 'open');
    this.renderer.appendChild(element, this.renderer.createText('Sign In'));
  }

}
