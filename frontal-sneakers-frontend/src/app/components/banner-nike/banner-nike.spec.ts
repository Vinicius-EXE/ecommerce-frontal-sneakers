import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerNike } from './banner-nike';

describe('BannerNike', () => {
  let component: BannerNike;
  let fixture: ComponentFixture<BannerNike>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerNike]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerNike);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
