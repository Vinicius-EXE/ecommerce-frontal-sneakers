import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecalho } from './components/cabecalho/cabecalho';
import { BannerHome } from './components/banner-home/banner-home';
import { CardCategoria } from './components/card-categoria/card-categoria';
import { CardProduto } from './components/card-produto/card-produto';
import { Rodape } from './components/rodape/rodape';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Cabecalho, BannerHome, CardCategoria, CardProduto, Rodape],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerce-frontal-sneakers');
}
