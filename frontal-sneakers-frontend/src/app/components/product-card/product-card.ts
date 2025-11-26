import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product: any;
  selectedSize: string = '';
  sizes: string[] = ['34', '35', '36', '37', '38', '39', '40', '41', '42', '43'];

  constructor(private cartService: CartService) { }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  addToCart() {
    if (!this.selectedSize) {
      alert('Por favor, selecione um tamanho.');
      return;
    }
    this.cartService.addToCart(this.product, this.selectedSize);
    alert('Produto adicionado ao carrinho!');
    this.selectedSize = ''; // Reset selection
  }
}
