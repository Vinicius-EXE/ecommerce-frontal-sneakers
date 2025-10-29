import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostruarioComponent } from './mostruario.component';

describe('Mostruario', () => {
  let component: MostruarioComponent;
  let fixture: ComponentFixture<MostruarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostruarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostruarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
