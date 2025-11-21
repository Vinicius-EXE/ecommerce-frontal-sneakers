import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brands-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands-slider.html',
  styleUrl: './brands-slider.css',
})
export class BrandsSlider {
  @Input() title: string = 'Nossas marcas';

  brands = [
    { name: 'Adidas', src: 'assets/brands-icons/adidas-icon.svg' },
    { name: 'Asics', src: 'assets/brands-icons/asics-icon.svg' },
    { name: 'Jordan', src: 'assets/brands-icons/jordan-icon.svg' },
    { name: 'Mizuno', src: 'assets/brands-icons/mizuno-icon.svg' },
    { name: 'New Balance', src: 'assets/brands-icons/new-balence-icon.svg' },
    { name: 'Nike', src: 'assets/brands-icons/nike-icon.svg' },
    { name: 'Oakley', src: 'assets/brands-icons/oakley-icon.svg' },
    { name: 'Puma', src: 'assets/brands-icons/puma-icon.svg' },
    { name: 'Vans', src: 'assets/brands-icons/vans-icon.svg' },
  ];

  currentIndex = 0;
  itemsPerView = 5;
  intervalId: any;

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  get transformStyle() {
    const percentage = this.currentIndex * (100 / this.itemsPerView);
    return `translateX(-${percentage}%)`;
  }

  startAutoPlay() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 1000);
  }

  stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  next() {
    if (this.currentIndex >= this.brands.length - this.itemsPerView) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
  }

  prev() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.brands.length - this.itemsPerView;
    } else {
      this.currentIndex--;
    }
  }
}
