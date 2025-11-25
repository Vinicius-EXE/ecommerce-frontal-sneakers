import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CheckoutComponent } from "./components/check-out/check-out";
import { AboutUsComponent } from "./components/about-us/about-us"; 

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, CheckoutComponent, AboutUsComponent],
  templateUrl: './app.html', 
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerce-frontal-sneakers');
}