import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-description.html',
  styleUrl: './product-description.css',
})
export class ProductDescription {
  @Input() description: string = '';
}
