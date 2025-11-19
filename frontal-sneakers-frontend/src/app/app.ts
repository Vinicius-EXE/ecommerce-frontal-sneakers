import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Adm } from "./components/adm/adm";
import { Cabecalho } from "./components/cabecalho/cabecalho";
import { Rodape } from "./components/rodape/rodape";
import { AddEndereco } from "./components/add-endereco/add-endereco";
import { AddCartao } from "./components/add-cartao/add-cartao";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Adm, Cabecalho, Rodape, AddEndereco, AddCartao],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerce-frontal-sneakers');
}
