import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
      console.log('Security Info Updated', this.securityForm.value);
      this.showConfirmation = false;
      this.currentPassword.reset();
      this.securityForm.reset();
      alert('Informações de segurança atualizadas com sucesso!');
    }
  }

  cancelConfirmation() {
    this.showConfirmation = false;
    this.currentPassword.reset();
  }
}
