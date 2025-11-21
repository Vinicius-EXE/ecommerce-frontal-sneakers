import { Component } from '@angular/core';
import { Cabecalho } from '../../components/cabecalho/cabecalho';
import { BannerHome } from '../../components/banner-home/banner-home';
import { Rodape } from '../../components/rodape/rodape';
import { ProductsSlider } from '../../components/products-slider/products-slider';
import { BrandsSlider } from '../../components/brands-slider/brands-slider';
@Component({
  selector: 'app-home-page',
  imports: [ Cabecalho, BannerHome, BrandsSlider, ProductsSlider, Rodape ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
