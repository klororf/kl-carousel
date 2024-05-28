import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KlCarouselComponent } from '../../dist/ngx-kl-carousel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,KlCarouselComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kl-carousel';
  images=[
  ]
}
