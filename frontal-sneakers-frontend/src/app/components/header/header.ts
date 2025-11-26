import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  cartCount$: Observable<number>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {
    this.cartCount$ = this.cartService.cart$.pipe(
      map(items => items.reduce((acc, item) => acc + item.quantity, 0))
    );
  }

  navigateToUserArea() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/user']);
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
