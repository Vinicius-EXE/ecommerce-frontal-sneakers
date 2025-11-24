import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from '@coreui/angular';

@Component({
  selector: 'app-product-image-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './product-image-carousel.html',
  styleUrl: './product-image-carousel.css',
})
export class ProductImageCarousel implements OnInit {
  slides: any[] = [];

  ngOnInit(): void {
    // Initialize with example images, max 8
    this.slides = [
      { src: './assets/sneaker-slider-example/slider-example-01.svg', title: 'First Slide' },
      { src: './assets/sneaker-slider-example/slider-example-02.svg', title: 'Second Slide' },
      { src: './assets/sneaker-slider-example/slider-example-03.svg', title: 'Third Slide' },
      { src: './assets/sneaker-slider-example/slider-example-04.svg', title: 'Fourth Slide' },
      { src: './assets/sneaker-slider-example/slider-example-05.svg', title: 'Fifth Slide' },
      { src: './assets/sneaker-slider-example/slider-example-06.svg', title: 'Sixth Slide' },
      { src: './assets/sneaker-slider-example/slider-example-07.svg', title: 'Seventh Slide' }
    ];

    // Ensure max 8 images
    if (this.slides.length > 8) {
      this.slides = this.slides.slice(0, 8);
    }
  }
}
