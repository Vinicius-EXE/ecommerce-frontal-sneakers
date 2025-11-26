import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from '@coreui/angular';

@Component({
  selector: 'app-product-image-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './product-image-carousel.html',
  styleUrl: './product-image-carousel.css',
})
export class ProductImageCarousel implements OnChanges {
  @Input() images: string = '';
  slides: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['images'] && this.images) {
      const imageUrls = this.images.split(',');
      this.slides = imageUrls.map((url, index) => ({
        src: url.trim(),
        title: `Product Image ${index + 1}`
      })).slice(0, 8);
    }
  }
}
