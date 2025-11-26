import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-orders.html',
  styleUrl: './manage-orders.css',
})
export class ManageOrders implements OnInit {
  orders: any[] = [];
  selectedOrder: any = null;
  showDetailsPopup = false;

  statusOptions = [
    'PAGAMENTO EM ANDAMENTO',
    'PAGAMENTO APROVADO',
    'ENVIADO',
    'ENTREGUE',
    'CANCELADO'
  ];

  constructor(
    private orderService: OrderService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadOrders();
    }
  }

  loadOrders() {
    this.orderService.getOrders().subscribe({
      next: (data) => this.orders = data,
      error: (err) => console.error('Error loading orders', err)
    });
  }

  viewDetails(order: any) {
    this.selectedOrder = { ...order };
    this.showDetailsPopup = true;
  }

  closeDetails() {
    this.showDetailsPopup = false;
    this.selectedOrder = null;
  }

  updateStatus(newStatus: string) {
    if (this.selectedOrder) {
      this.selectedOrder.status = newStatus;
    }
  }

  saveOrder() {
    if (this.selectedOrder) {
      this.orderService.updateOrderStatus(this.selectedOrder.id, this.selectedOrder.status).subscribe({
        next: () => {
          alert('Status do pedido atualizado com sucesso!');
          this.loadOrders();
          this.closeDetails();
        },
        error: (err) => alert('Erro ao atualizar status do pedido.')
      });
    }
  }
}
