import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buy-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buy-product.html',
  styleUrl: './buy-product.css',
})
export class BuyProduct implements OnChanges {
  @Input() product: any;
  sizes: number[] = [];
  selectedSize: number | null = null;
  quantity: number = 1;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.product) {
      if (this.product.sizes) {
        this.sizes = this.product.sizes.split(',').map((s: string) => parseInt(s.trim()));
      } else {
        this.sizes = [];
      }
    }
  }

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
