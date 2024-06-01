import { NgFor, NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Signal,
  ViewChild,
  ViewChildren,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { carouselItem, carouselItems } from '../interfaces/carouselItem';

@Component({
  selector: 'kl-carousel',
  standalone: true,
  imports: [NgOptimizedImage, NgFor, FormsModule],
  templateUrl: './kl-carousel.component.html',
  styleUrl: './kl-carousel.component.scss',
})
export class KlCarouselComponent implements AfterViewInit {
  @Input({ required: false }) expandIn: number = 5000;
  @Input({ required: true }) images: carouselItems = [];
  @Input({ required: false }) height?: string;
  @Input({ required: false }) gap: number = 5;
  @Input({ required: false }) focusBasis: number = 50;
  @Input({ required: false }) nonFocusBasis: number = 20;

  @Output() clickedImage: EventEmitter<string> = new EventEmitter();
  public getHeight: Signal<string> = computed(() => {
    if (this.height) return `${this.height}`;
    else return '';
  });
  private _slideFocusIndex: WritableSignal<number> = signal(0);
  private _slideNextFocus: Signal<number> = computed(() => {
    const length = this.slides.toArray().length;
    if (this._slideFocusIndex() === length - 1) {
      return 0;
    }
    return this._slideFocusIndex() + 1;
  });
  private _slidePreviousFocus: Signal<number> = computed(() => {
    const length = this.slides.toArray().length;
    if (this._slideFocusIndex() === 0) {
      return this.slides.length - 1;
    }
    return this._slideFocusIndex() - 1;
  });
  private readonly _focus: string = 'focus';
  @ViewChild('carousel') private carousel!: ElementRef<HTMLElement>;
  @ViewChildren('slide') private slides!: QueryList<ElementRef<HTMLElement>>;

  ngAfterViewInit(): void {
    this.slides.toArray().forEach(el=>el.nativeElement.style.flexBasis=`${this.nonFocusBasis}%`)
    if (this.slides.length === 1)
      this.slides.first.nativeElement.style.flexBasis = `100%`;
    else
      this.slides.first.nativeElement.style.flexBasis = `${this.focusBasis}%`;
  }

  private lastX = 0;
  private directionTouch: 'NEXT' | 'BACK' = 'NEXT';
  onTouchMove($event: TouchEvent) {
    const maxWidth = this.carousel.nativeElement.clientWidth / 3;
    const xPosition = $event.touches[0].screenX;
    //max basis 50
    //min basis 20

    if (this.lastX !== 0) {
      this.directionTouch = xPosition < this.lastX ? 'NEXT' : 'BACK';
      const actual =
        this.slides.toArray()[this._slideFocusIndex()].nativeElement;
      let next = undefined;
      let moved = undefined;
      if (this.directionTouch === 'NEXT') {
        moved = this.lastX - xPosition;
        next = this.slides.toArray()[this._slideNextFocus()].nativeElement;
      } else {
        moved = xPosition - this.lastX;
        next = this.slides.toArray()[this._slidePreviousFocus()].nativeElement;
      }
      const basisActual = Number(actual.style.flexBasis.replace('%', ''));
      const basisNext = Number(next.style.flexBasis.replace('%', ''));

      let updatedBasisActual =  (this.nonFocusBasis * moved) / maxWidth;
      let updatedBasisNext = this.nonFocusBasis + (this.focusBasis * moved) / maxWidth;
      console.log(updatedBasisNext);
      if (updatedBasisActual < this.nonFocusBasis)
        updatedBasisActual = this.nonFocusBasis;
      if (updatedBasisActual > this.focusBasis)
        updatedBasisActual = this.focusBasis;
      if (updatedBasisNext > this.focusBasis)
        updatedBasisNext = this.focusBasis;
      if (updatedBasisNext < this.nonFocusBasis)
        updatedBasisNext = this.nonFocusBasis;
      actual.style.flexBasis = updatedBasisActual + '%';
      next.style.flexBasis = updatedBasisNext + '%';
    }
    else {
      this.lastX = xPosition;
    }
  }

  onTouchEnd($event: TouchEvent) {
    const actual = this.slides.toArray()[this._slideFocusIndex()].nativeElement;
    actual.style.flexBasis = `${this.nonFocusBasis}%`;
    this.lastX = 0;
    if (this.directionTouch === 'NEXT') {
      const next = this.slides.toArray()[this._slideNextFocus()].nativeElement;
      next.style.flexBasis = `${this.focusBasis}%`;
      this._slideFocusIndex.set(this._slideNextFocus());
    } else {
      const next =
        this.slides.toArray()[this._slidePreviousFocus()].nativeElement;
      next.style.flexBasis = `${this.focusBasis}%`;
      this._slideFocusIndex.set(this._slidePreviousFocus());
    }
  }
}
