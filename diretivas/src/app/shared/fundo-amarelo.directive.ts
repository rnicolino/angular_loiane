import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: 'button[fundoAmarelo]'
})
export class FundoAmareloDirective {

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2) { 
    //console.log(this._elementRef);
    //this._elementRef.nativeElement.style.backgroundColor = 'Yellow'; problema com segurança
    this._renderer.setStyle(
      this._elementRef.nativeElement,
      'backgroundColor',
      'Yellow');
  }

}
