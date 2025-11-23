import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Rodape } from '../../components/rodape/rodape';
import { CardProduto } from '../../components/card-produto/card-produto';

@Component({
  selector: 'app-catalog-page',
  imports: [ Header, CardProduto, Rodape ],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.css',
})
export class CatalogPage {

}
