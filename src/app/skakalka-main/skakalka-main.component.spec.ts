import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkakalkaMainComponent } from './skakalka-main.component';

describe('SkakalkaMainComponent', () => {
  let component: SkakalkaMainComponent;
  let fixture: ComponentFixture<SkakalkaMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkakalkaMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkakalkaMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
