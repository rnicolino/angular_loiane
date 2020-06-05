import { Directive, HostListener, HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[highlightMouse]'
})
export class HighlightMouseDirective {

  @HostListener('mouseenter') onMouseOver(){
    /*this._renderer2.setStyle(
      this._elementRef.nativeElement,
      'backgroundColor',
      'Yellow'
    );*/
    this.backgroundColor = 'Yellow';
  }

  @HostListener('mouseleave') onMouseLeave(){
    /*this._renderer2.setStyle(
      this._elementRef.nativeElement,
      'backgroundColor',
      'White'
    );*/
    this.backgroundColor = 'White';
  }

  //@HostBinding('style.backgroundColor') backgroundColor: string; //metodo 1 quando não tem manipulação da váriavel
    //codigo extra

  @HostBinding('style.backgroundColor') get setColor(){ //metodo 2 para quando tiver manipulação da váriavel
    //codigo extra
    return this.backgroundColor;
  }

  private backgroundColor: string;

  constructor(
    /*private _elementRef: ElementRef,
    private _renderer2: Renderer2*/
  ) { }

}
