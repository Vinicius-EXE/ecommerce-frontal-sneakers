import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmArea } from './adm-area';

describe('AdmArea', () => {
  let component: AdmArea;
  let fixture: ComponentFixture<AdmArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmArea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmArea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
