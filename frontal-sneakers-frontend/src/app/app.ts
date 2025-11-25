import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CheckoutComponent } from "./components/check-out/check-out"; 

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, CheckoutComponent],
  templateUrl: './app.html', 
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerce-frontal-sneakers');
}