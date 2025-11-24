import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { ProductDescription } from "../../components/product-description/product-description";
import { ProductImageCarousel } from "../../components/product-image-carousel/product-image-carousel";
import { BuyProduct } from "../../components/buy-product/buy-product";
import { ProductsSlider } from "../../components/products-slider/products-slider";
import { Rodape } from "../../components/rodape/rodape";

@Component({
  selector: 'app-product-page',
  imports: [Header, ProductDescription, ProductImageCarousel, BuyProduct, ProductsSlider, Rodape],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})
export class ProductPage {

}
