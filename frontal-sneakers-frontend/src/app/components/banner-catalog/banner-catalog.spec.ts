import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCatalog } from './banner-catalog';

describe('BannerCatalog', () => {
  let component: BannerCatalog;
  let fixture: ComponentFixture<BannerCatalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerCatalog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerCatalog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
