import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../components/header/header';
import { Rodape } from '../../components/rodape/rodape';
import { ProductCard } from '../../components/product-card/product-card';
import { BannerCatalog } from "../../components/banner-catalog/banner-catalog";
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [CommonModule, FormsModule, Header, ProductCard, Rodape, BannerCatalog],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.css',
})
export class CatalogPage implements OnInit {
  products: any[] = [];
  page = 0;
  size = 9;
  sort = 'name,asc';
  hasMore = true;

  sortOptions = [
    { label: 'Nome (A-Z)', value: 'name,asc' },
    { label: 'Nome (Z-A)', value: 'name,desc' },
    { label: 'Menor Preço', value: 'price,asc' },
    { label: 'Maior Preço', value: 'price,desc' }
  ];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts(this.page, this.size, this.sort).subscribe({
      next: (data: any) => {
        this.products = [...this.products, ...data.content];
        this.hasMore = !data.last;
      },
      error: (err) => console.error('Error loading products', err)
    });
  }

  loadMore() {
    this.page++;
    this.loadProducts();
  }

  onSortChange(event: any) {
    this.sort = event.target.value;
    this.page = 0;
    this.products = [];
    this.loadProducts();
  }
}
