import { NgFor, NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  Signal,
  ViewChildren,
  computed,
} from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'kl-carousel',
  standalone: true,
  imports: [NgOptimizedImage, NgFor, FormsModule],
  templateUrl: './kl-carousel.component.html',
  styleUrl: './kl-carousel.component.scss',
})
export class KlCarouselComponent implements AfterViewInit {
  @Input({ required: false }) expandIn: number = 5000;
  @Input({ required: true }) images: Array<string> = [];
  @Input({required:false}) height?: string;
  public getHeight: Signal<string> = computed(()=>{
    if(this.height)
      return `${this.height}`
    else
    return '';
  })
  private readonly _focus: string = 'focus'
  @ViewChildren('slide') private slides!: QueryList<ElementRef<HTMLElement>>;
  
  ngAfterViewInit(): void {
    const slides = this.slides.toArray();
    setInterval(() => {
      const actualFocus = slides.findIndex((x) =>
        (x.nativeElement as HTMLElement).classList.contains(this._focus)
      );
      this.slides.get(actualFocus)?.nativeElement.classList.remove(this._focus);
      if (actualFocus === slides.length - 1) {
        this.slides.get(0)?.nativeElement.classList.add(this._focus);
        this.slides.get(0)?.nativeElement.scrollIntoView({behavior: "smooth"})
      } else {
        this.slides.get(actualFocus + 1)?.nativeElement.classList.add(this._focus);
        this.slides.get(actualFocus + 2)?.nativeElement.scrollIntoView({behavior: "smooth"})
      }
    }, this.expandIn);
  }
}
