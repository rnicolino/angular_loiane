import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  @HostListener('mouseenter') onMouseOver(){
    this.backgroundColor = this.highLightColor;
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.backgroundColor = this.defaultColor;
  }

  @HostBinding('style.backgroundColor') backgroundColor: string; //metodo 1 quando não tem manipulação da váriavel

  @Input() defaultColor: string = 'White';
  @Input('highlight') highLightColor: string = 'Yellow';

  constructor(
  ) { }

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

}
