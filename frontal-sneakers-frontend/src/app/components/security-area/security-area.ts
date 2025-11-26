import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-security-area',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './security-area.html',
  styleUrl: './security-area.css',
})
export class SecurityArea {
  securityForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  showConfirmation = false;
  currentPassword = new FormControl('', [Validators.required]);

  constructor(private userService: UserService) { }

  onSubmit() {
    if (this.securityForm.valid) {
      if (this.securityForm.value.password !== this.securityForm.value.confirmPassword) {
        alert('As senhas não coincidem!');
        return;
      }
      this.showConfirmation = true;
    }
  }

  confirmSave() {
    if (this.currentPassword.valid) {
      const email = this.securityForm.get('email')?.value;
      const password = this.securityForm.get('password')?.value;

      if (email && email !== this.userService.currentUserValue?.email) {
        this.userService.updateProfile({ email }).subscribe({
          next: () => {
            alert('E-mail atualizado com sucesso!');
            this.resetForm();
          },
          error: (err) => alert('Erro ao atualizar e-mail.')
        });
      }

      if (password) {
        const payload = {
          currentPassword: this.currentPassword.value,
          newPassword: password
        };
        this.userService.updatePassword(payload).subscribe({
          next: () => {
            alert('Senha atualizada com sucesso!');
            this.resetForm();
          },
          error: (err) => {
            console.error(err);
            alert('Erro ao atualizar senha. Verifique sua senha atual.');
          }
        });
      }
    }
  }

  resetForm() {
    this.showConfirmation = false;
    this.currentPassword.reset();
    this.securityForm.reset();
  }

  cancelConfirmation() {
    this.showConfirmation = false;
    this.currentPassword.reset();
  }
}
