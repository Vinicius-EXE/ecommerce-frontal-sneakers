import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerVans } from './banner-vans';

describe('BannerVans', () => {
  let component: BannerVans;
  let fixture: ComponentFixture<BannerVans>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerVans]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerVans);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
