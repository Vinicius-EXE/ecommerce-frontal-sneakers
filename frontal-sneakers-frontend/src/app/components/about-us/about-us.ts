import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.html',
  styleUrls: ['./about-us.css']
})
export class AboutUsComponent {
  // Dados dinâmicos para facilitar manutenção futura
  features = [
    {
      title: 'Autenticidade',
      description: 'Garantia de produtos 100% originais. Aqui o hype é real.',
      icon: '✔️'
    },
    {
      title: 'Entrega Frontal',
      description: 'Chegamos até você com velocidade recorde, assim como nosso mascote.',
      icon: '🚀'
    },
    {
      title: 'Curadoria',
      description: 'Selecionamos os modelos que definem a cultura sneakerhead.',
      icon: '🔥'
    }
  ];
}