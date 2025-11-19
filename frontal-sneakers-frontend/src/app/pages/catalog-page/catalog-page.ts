import { Component } from '@angular/core';
import { Cabecalho } from '../../components/cabecalho/cabecalho';
import { Rodape } from '../../components/rodape/rodape';
import { CardProduto } from '../../components/card-produto/card-produto';

@Component({
  selector: 'app-catalog-page',
  imports: [ Cabecalho, CardProduto, Rodape ],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.css',
})
export class CatalogPage {

}
