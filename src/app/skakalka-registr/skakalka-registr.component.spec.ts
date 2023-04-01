import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkakalkaRegistrComponent } from './skakalka-registr.component';

describe('SkakalkaRegistrComponent', () => {
  let component: SkakalkaRegistrComponent;
  let fixture: ComponentFixture<SkakalkaRegistrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkakalkaRegistrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkakalkaRegistrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
