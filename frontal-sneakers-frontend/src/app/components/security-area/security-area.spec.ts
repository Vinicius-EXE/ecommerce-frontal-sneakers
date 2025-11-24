import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityArea } from './security-area';

describe('SecurityArea', () => {
  let component: SecurityArea;
  let fixture: ComponentFixture<SecurityArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityArea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityArea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
