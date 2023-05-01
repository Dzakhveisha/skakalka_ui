import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableTrainersComponent } from './available-trainers.component';

describe('AvailableTrainersComponent', () => {
  let component: AvailableTrainersComponent;
  let fixture: ComponentFixture<AvailableTrainersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableTrainersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableTrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
