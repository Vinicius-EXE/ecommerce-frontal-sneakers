import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPromocao } from './card-promocao';

describe('CardPromocao', () => {
  let component: CardPromocao;
  let fixture: ComponentFixture<CardPromocao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPromocao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPromocao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
