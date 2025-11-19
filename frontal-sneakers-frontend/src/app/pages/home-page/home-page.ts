import { Component } from '@angular/core';
import { Cabecalho } from '../../components/cabecalho/cabecalho';
import { BannerHome } from '../../components/banner-home/banner-home';
import { Rodape } from '../../components/rodape/rodape';
import { CardCategoria } from '../../components/card-categoria/card-categoria';
import { CardPromocao } from '../../components/card-promocao/card-promocao';

@Component({
  selector: 'app-home-page',
  imports: [ Cabecalho, BannerHome, CardCategoria, CardPromocao, Rodape ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
