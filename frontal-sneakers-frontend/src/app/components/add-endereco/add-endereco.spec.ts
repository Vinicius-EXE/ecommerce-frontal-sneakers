import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEndereco } from './add-endereco';

describe('AddEndereco', () => {
  let component: AddEndereco;
  let fixture: ComponentFixture<AddEndereco>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEndereco]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEndereco);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
