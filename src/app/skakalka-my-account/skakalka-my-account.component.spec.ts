import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkakalkaMyAccountComponent } from './skakalka-my-account.component';

describe('SkakalkaMyAccountComponent', () => {
  let component: SkakalkaMyAccountComponent;
  let fixture: ComponentFixture<SkakalkaMyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkakalkaMyAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkakalkaMyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
