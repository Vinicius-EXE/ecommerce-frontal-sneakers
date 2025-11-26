import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {
  orders: any[] = [];

  constructor(
    private orderService: OrderService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.orderService.getUserOrders().subscribe({
        next: (data) => {
          this.orders = data;
        },
        error: (err) => {
          console.error('Erro ao buscar pedidos', err);
        }
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'DELIVERED': return 'status-delivered';
      case 'SHIPPED': return 'status-shipped';
      case 'PAID': return 'status-approved';
      case 'PENDING': return 'status-analysis';
      case 'CANCELLED': return 'status-cancelled';
      default: return '';
    }
  }
}
