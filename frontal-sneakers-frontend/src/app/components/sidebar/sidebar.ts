import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  isCollapsed = false;
  @Output() toggle = new EventEmitter<boolean>();

  menuItems = [
    { label: 'Informações Pessoais', icon: 'person', href: '/user/personal-info' },
    { label: 'Meus Cartões', icon: 'credit_card', href: '/user/cards' },
    { label: 'Meus Endereços', icon: 'location_on', href: '/user/addresses' },
    { label: 'Meus Pedidos', icon: 'shopping_bag', href: '/user/orders' },
    { label: 'Segurança', icon: 'security', href: '/user/security' }
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.toggle.emit(this.isCollapsed);
  }

  logout() {
    console.log('Logout clicked');
    // Implement logout logic here
  }
}
