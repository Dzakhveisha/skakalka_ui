import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkakalkaLoginComponent } from './skakalka-login.component';

describe('SkakalkaLoginComponent', () => {
  let component: SkakalkaLoginComponent;
  let fixture: ComponentFixture<SkakalkaLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkakalkaLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkakalkaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
