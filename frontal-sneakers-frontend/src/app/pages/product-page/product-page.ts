import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { BuyTenis } from '../../components/buy-tenis/buy-tenis';

@Component({
  selector: 'app-product-page',
  imports: [ Header, BuyTenis],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})
export class ProductPage {

}
