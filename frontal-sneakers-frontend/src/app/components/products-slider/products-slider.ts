import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../product-card/product-card';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-slider',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './products-slider.html',
  styleUrl: './products-slider.css',
})
export class ProductsSlider implements OnInit {
  @Input() title: string = '';
  @Input() brand: string = ''; // Optional, if needed for other logic, but logic depends on title per user request.

  products: any[] = [];
  currentIndex = 0;
  itemsPerView = 4;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    if (this.title === 'Produtos Relacionados') {
      this.productService.getRandomProducts(8).subscribe({
        next: (data) => this.products = data,
        error: (err) => console.error(err)
      });
    } else {
      this.productService.getProductsByBrand(this.title).subscribe({
        next: (data) => this.products = data.slice(0, 8),
        error: (err) => console.error(err)
      });
    }
  }

  get transformStyle() {
    const percentage = this.currentIndex * (100 / this.itemsPerView);
    return `translateX(-${percentage}%)`;
  }

  next() {
    if (this.products.length > this.itemsPerView) {
      if (this.currentIndex >= this.products.length - this.itemsPerView) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
    }
  }

  prev() {
    if (this.products.length > this.itemsPerView) {
      if (this.currentIndex === 0) {
        this.currentIndex = this.products.length - this.itemsPerView;
      } else {
        this.currentIndex--;
      }
    }
  }
}
