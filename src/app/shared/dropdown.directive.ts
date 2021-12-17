import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  isOpen: boolean = false;
  @HostListener('document:click', ['$event'])
  DocumentClick(event: Event) {
    const dropdown: any = this.elRef.nativeElement.nextElementSibling;
    if (this.elRef.nativeElement.contains(event.target)) {
      if (!this.isOpen) {
        this.renderer.addClass(dropdown, 'show');
        this.isOpen = true;
      } else {
        this.renderer.removeClass(dropdown, 'show');
        this.isOpen = false;
      }
    } else {
      this.renderer.removeClass(dropdown, 'show');
      this.isOpen = false;
    }
  }
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
}
