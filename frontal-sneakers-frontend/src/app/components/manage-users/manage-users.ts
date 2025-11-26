import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-users.html',
  styleUrl: './manage-users.css',
})
export class ManageUsers implements OnInit {
  users: any[] = [];
  showDeleteConfirmation = false;
  showPromoteConfirmation = false;
  userToDeleteId: number | null = null;
  userToPromoteId: number | null = null;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Error loading users', err)
    });
  }

  confirmPromote(id: number) {
    this.userToPromoteId = id;
    this.showPromoteConfirmation = true;
  }

  cancelPromote() {
    this.showPromoteConfirmation = false;
    this.userToPromoteId = null;
  }

  promoteUser() {
    if (this.userToPromoteId) {
      this.adminService.updateUserRole(this.userToPromoteId, 'ADMIN').subscribe({
        next: () => {
          alert('Usuário promovido a ADMIN com sucesso!');
          this.loadUsers();
          this.showPromoteConfirmation = false;
          this.userToPromoteId = null;
        },
        error: (err) => alert('Erro ao promover usuário.')
      });
    }
  }

  confirmDelete(id: number) {
    this.userToDeleteId = id;
    this.showDeleteConfirmation = true;
  }

  cancelDelete() {
    this.showDeleteConfirmation = false;
    this.userToDeleteId = null;
  }

  deleteUser() {
    if (this.userToDeleteId) {
      this.adminService.deleteUser(this.userToDeleteId).subscribe({
        next: () => {
          alert('Usuário excluído com sucesso!');
          this.loadUsers();
          this.showDeleteConfirmation = false;
          this.userToDeleteId = null;
        },
        error: (err) => alert('Erro ao excluir usuário.')
      });
    }
  }
}
