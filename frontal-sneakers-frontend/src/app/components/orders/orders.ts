import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  orders = [
    { id: '#12345', value: 'R$ 450,00', status: 'Entregue', date: '20/11/2024' },
    { id: '#12346', value: 'R$ 299,90', status: 'Enviado', date: '22/11/2024' },
    { id: '#12347', value: 'R$ 899,00', status: 'Pagamento Aprovado', date: '24/11/2024' },
    { id: '#12348', value: 'R$ 150,00', status: 'Em Análise', date: '24/11/2024' },
    { id: '#12349', value: 'R$ 1.200,00', status: 'Cancelado', date: '15/11/2024' },
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'Entregue': return 'status-delivered';
      case 'Enviado': return 'status-shipped';
      case 'Pagamento Aprovado': return 'status-approved';
      case 'Em Análise': return 'status-analysis';
      case 'Cancelado': return 'status-cancelled';
      default: return '';
    }
  }
}
