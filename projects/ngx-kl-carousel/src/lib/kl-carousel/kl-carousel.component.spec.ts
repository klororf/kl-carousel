import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlCarouselComponent } from './kl-carousel.component';

describe('KlCarouselComponent', () => {
  let component: KlCarouselComponent;
  let fixture: ComponentFixture<KlCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KlCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KlCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
