import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface CartItem {
    product: any;
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems = new BehaviorSubject<CartItem[]>([]);
    cart$ = this.cartItems.asObservable();

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                this.cartItems.next(JSON.parse(savedCart));
            }
        }
    }

    addToCart(product: any) {
        const currentCart = this.cartItems.value;
        const existingItem = currentCart.find(item => item.product.id === product.id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            currentCart.push({ product, quantity: 1 });
        }

        this.updateCart(currentCart);
    }

    removeFromCart(productId: number) {
        const currentCart = this.cartItems.value.filter(item => item.product.id !== productId);
        this.updateCart(currentCart);
    }

    clearCart() {
        this.updateCart([]);
    }

    getCartTotal(): number {
        return this.cartItems.value.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    }

    getItems(): CartItem[] {
        return this.cartItems.value;
    }

    private updateCart(cart: CartItem[]) {
        this.cartItems.next(cart);
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
}
