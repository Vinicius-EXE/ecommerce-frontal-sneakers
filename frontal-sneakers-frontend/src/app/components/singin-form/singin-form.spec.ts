import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinginForm } from './singin-form';

describe('SinginForm', () => {
  let component: SinginForm;
  let fixture: ComponentFixture<SinginForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinginForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinginForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
