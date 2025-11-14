import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMarca } from './card-marca';

describe('CardMarca', () => {
  let component: CardMarca;
  let fixture: ComponentFixture<CardMarca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMarca]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMarca);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
