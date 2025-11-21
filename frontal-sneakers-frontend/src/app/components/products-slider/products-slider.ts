import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProduto } from '../card-produto/card-produto';

@Component({
  selector: 'app-products-slider',
  standalone: true,
  imports: [ CommonModule, CardProduto ],
  templateUrl: './products-slider.html',
  styleUrl: './products-slider.css',
})
export class ProductsSlider {
  @Input() title: string = '';

  // Array representing 8 cards. Since CardProduto is static, we just need an array of length 8.
  cards = new Array(8).fill(0);
  
  currentIndex = 0;
  itemsPerView = 4;

  get transformStyle() {
    // We move the track by percentage based on currentIndex
    // Each item is 100% / itemsPerView wide.
    // We shift left by currentIndex * (100 / itemsPerView)%
    const percentage = this.currentIndex * (100 / this.itemsPerView);
    return `translateX(-${percentage}%)`;
  }

  next() {
    // Circular logic: if we are at the end, loop back to start
    // "End" means we can't show 3 more items.
    // Actually, for a true circular feel without cloning, we usually just stop or loop index.
    // Let's implement simple loop: if index + itemsPerView >= length, go to 0?
    // Or just increment and let it slide?
    // If we want to show 3 items, the max index we can slide to is length - itemsPerView.
    // If we want "infinite" loop, we need cloning.
    // Given the request "circular slider", I'll implement a wrap-around index.
    
    if (this.currentIndex >= this.cards.length - this.itemsPerView) {
        this.currentIndex = 0;
    } else {
        this.currentIndex++;
    }
  }

  prev() {
    if (this.currentIndex === 0) {
        this.currentIndex = this.cards.length - this.itemsPerView;
    } else {
        this.currentIndex--;
    }
  }
}
