import { Component, OnInit, OnChanges, DoCheck, OnDestroy, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, Input } from '@angular/core';

@Component({
  selector: 'app-ciclo',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.css']
})
export class CicloComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() valorInicial: number = 10;

  constructor() {
    this.log('constructor');
   }

  ngOnInit(): void {
    this.log('ngOnInit');
  }

  ngOnChanges(){
    this.log('ngOnChanges');
  }

  ngDoCheck() {
    this.log('ngDoCheck');
  }

  ngAfterContentInit() {
    this.log('ngAfterContentInit');
  }

  ngAfterContentChecked() {
    this.log('ngAfterContentChecked');
  }

  ngAfterViewInit() {
    this.log('ngAfterViewInit');
  }

  ngAfterViewChecked() {
    this.log('ngAfterViewChecked');
  }

  ngOnDestroy(){
    this.log('ngOnDestroy');
  }

  private log(hook: string){
    console.log(hook);
  }

}
