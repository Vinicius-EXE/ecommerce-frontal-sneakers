import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  isCollapsed = false;
  isAdmExpanded = false;
  @Output() toggle = new EventEmitter<boolean>();

  constructor(private authService: AuthService, private router: Router) { }

  get menuItems() {
    const items: any[] = [
      { label: 'Informações Pessoais', icon: 'person', href: '/user/personal-info' },
      { label: 'Meus Cartões', icon: 'credit_card', href: '/user/cards' },
      { label: 'Meus Endereços', icon: 'location_on', href: '/user/addresses' },
      { label: 'Meus Pedidos', icon: 'shopping_bag', href: '/user/orders' },
      { label: 'Segurança', icon: 'security', href: '/user/security' },
    ];

    if (this.authService.isAdmin()) {
      items.push({
        label: 'ADM Area',
        icon: 'admin_panel_settings',
        action: () => this.toggleAdm(),
        children: [
          { label: 'Gerenciar Produtos', icon: 'inventory_2', href: '/user/manage-products' },
          { label: 'Gerenciar Pedidos', icon: 'list_alt', href: '/user/manage-orders' },
          { label: 'Gerenciar Usuários', icon: 'group', href: '/user/manage-users' }
        ]
      });
    }

    return items;
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.toggle.emit(this.isCollapsed);
  }

  toggleAdm() {
    this.isAdmExpanded = !this.isAdmExpanded;
  }

  logout() {
    this.authService.logout();
  }
}
