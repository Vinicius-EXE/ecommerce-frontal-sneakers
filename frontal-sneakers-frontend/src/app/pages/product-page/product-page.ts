import { Component } from '@angular/core';
import { Cabecalho } from '../../components/cabecalho/cabecalho';
import { BuyTenis } from '../../components/buy-tenis/buy-tenis';

@Component({
  selector: 'app-product-page',
  imports: [ Cabecalho, BuyTenis],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})
export class ProductPage {

}
