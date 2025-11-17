import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingupForm } from './singup-form';

describe('SingupForm', () => {
  let component: SingupForm;
  let fixture: ComponentFixture<SingupForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingupForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingupForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
