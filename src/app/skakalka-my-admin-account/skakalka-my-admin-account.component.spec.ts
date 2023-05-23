import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkakalkaMyAdminAccountComponent } from './skakalka-my-admin-account.component';

describe('SkakalkaMyAdminAccountComponent', () => {
  let component: SkakalkaMyAdminAccountComponent;
  let fixture: ComponentFixture<SkakalkaMyAdminAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkakalkaMyAdminAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkakalkaMyAdminAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
