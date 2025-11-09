import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroContainer } from './cadastro-container';

describe('CadastroContainer', () => {
  let component: CadastroContainer;
  let fixture: ComponentFixture<CadastroContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
