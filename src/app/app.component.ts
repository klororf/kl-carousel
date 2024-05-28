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
"https://res.cloudinary.com/dzlu0ltrg/image/upload/w_400/q_auto:best/v1701116932/Moky/title_2_z1y9jy.jpg",
"https://res.cloudinary.com/dzlu0ltrg/image/upload/w_400/q_auto:best/v1701116936/Moky/title_kjlbdb.jpg",
"https://res.cloudinary.com/dzlu0ltrg/image/upload/w_400/q_auto:best/v1701116936/Moky/title_kjlbdb.jpg",
"https://res.cloudinary.com/dzlu0ltrg/image/upload/w_400/q_auto:best/v1701116936/Moky/title_kjlbdb.jpg",
"https://res.cloudinary.com/dzlu0ltrg/image/upload/w_400/q_auto:best/v1701116552/Moky/title_slk9vk.jpg"
  ]
}
