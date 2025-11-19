import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCartao } from './add-cartao';

describe('AddCartao', () => {
  let component: AddCartao;
  let fixture: ComponentFixture<AddCartao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCartao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCartao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
