import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSlider } from './products-slider';

describe('ProductsSlider', () => {
  let component: ProductsSlider;
  let fixture: ComponentFixture<ProductsSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsSlider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsSlider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
