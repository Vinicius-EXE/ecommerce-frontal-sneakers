import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-singin-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './singin-form.html',
  styleUrl: './singin-form.css',
})
export class SinginForm {
  email = '';
  password = '';
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: () => {
        alert('Login realizado com sucesso!');
        this.router.navigate(['/user']);
      },
      error: (err) => {
        console.error('Erro no login:', err);
        alert('Email ou senha incorretos.');
      }
    });
  }
}
