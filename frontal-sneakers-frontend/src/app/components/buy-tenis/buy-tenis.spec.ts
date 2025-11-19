import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyTenis } from './buy-tenis';

describe('BuyTenis', () => {
  let component: BuyTenis;
  let fixture: ComponentFixture<BuyTenis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyTenis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyTenis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
