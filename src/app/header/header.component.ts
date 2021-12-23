import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  // onClick() {
  //   const manage = this.elRef.nativeElement;
  //   this.renderer.addClass(manage, 'show');
  // }
}
