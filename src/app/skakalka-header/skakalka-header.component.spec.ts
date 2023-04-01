import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkakalkaHeaderComponent } from './skakalka-header.component';

describe('SkakalkaHeaderComponent', () => {
  let component: SkakalkaHeaderComponent;
  let fixture: ComponentFixture<SkakalkaHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkakalkaHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkakalkaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
