import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkakalkaTrainerSearchFormComponent } from './skakalka-trainer-search-form.component';

describe('SkakalkaTrainerSearchFormComponent', () => {
  let component: SkakalkaTrainerSearchFormComponent;
  let fixture: ComponentFixture<SkakalkaTrainerSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkakalkaTrainerSearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkakalkaTrainerSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
