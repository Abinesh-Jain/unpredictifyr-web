import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appPicsum]',
  standalone: true
})
export class PicsumDirective implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.setImageDimensions();
  }

  private setImageDimensions() {
    const element = this.el.nativeElement;
    const width = element.clientWidth;
    const height = element.clientHeight;
    const imageUrl = `https://picsum.photos/${width}/${height}`;
    element.style.backgroundImage = `url(${imageUrl})`;
  }

  @HostListener('window:resize')
  onResize() {
    this.setImageDimensions();
  }

}
