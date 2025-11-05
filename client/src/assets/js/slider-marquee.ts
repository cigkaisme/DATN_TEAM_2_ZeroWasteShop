import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSliderMarquee]',
  standalone: true
})
export class SliderMarqueeDirective implements OnInit {
  private speed = 2.0;
  private currentPosition = 0;
  private contentWidth = 0;
  private containerWidth = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const content = this.el.nativeElement.innerHTML;
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', content + content);

    setTimeout(() => {
        const container = this.renderer.parentNode(this.el.nativeElement);
        this.containerWidth = container.offsetWidth;
        this.contentWidth = this.el.nativeElement.offsetWidth / 2;

        if (this.contentWidth > 0) {
            this.startMarquee();
        }
    }, 0);
  }

  startMarquee() {
    setInterval(() => {
      this.currentPosition -= this.speed;

      if (this.currentPosition <= -this.contentWidth) {
        this.currentPosition = 0;
      }

      this.renderer.setStyle(
        this.el.nativeElement,
        'transform',
        `translateX(${this.currentPosition}px)`
      );
    }, 1000 / 60);
  }
}
