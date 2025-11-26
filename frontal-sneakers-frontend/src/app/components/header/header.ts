import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(private authService: AuthService, private router: Router) { }

  navigateToUserArea() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/user']);
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
