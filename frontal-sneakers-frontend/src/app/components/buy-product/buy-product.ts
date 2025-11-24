import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buy-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buy-product.html',
  styleUrl: './buy-product.css',
})
export class BuyProduct {
  sizes: number[] = [35, 36, 37, 38, 39, 40, 41, 42, 43];
  selectedSize: number | null = null;
  quantity: number = 1;

  selectSize(size: number) {
    this.selectedSize = size;
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
