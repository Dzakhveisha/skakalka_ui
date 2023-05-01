import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkakalkaPriceComponent } from './skakalka-price.component';

describe('SkakalkaPriceComponent', () => {
  let component: SkakalkaPriceComponent;
  let fixture: ComponentFixture<SkakalkaPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkakalkaPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkakalkaPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
