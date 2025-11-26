import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Header } from '../../components/header/header';
import { ProductDescription } from "../../components/product-description/product-description";
import { ProductImageCarousel } from "../../components/product-image-carousel/product-image-carousel";
import { BuyProduct } from "../../components/buy-product/buy-product";
import { ProductsSlider } from "../../components/products-slider/products-slider";
import { Rodape } from "../../components/rodape/rodape";
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, Header, ProductDescription, ProductImageCarousel, BuyProduct, ProductsSlider, Rodape],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})
export class ProductPage implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadProduct(id);
      }
    });
  }

  loadProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: (data) => this.product = data,
      error: (err) => console.error('Error loading product', err)
    });
  }
}
