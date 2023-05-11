import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkakalkaMyTrainerAccountComponent } from './skakalka-my-trainer-account.component';

describe('SkakalkaMyTrainerAccountComponent', () => {
  let component: SkakalkaMyTrainerAccountComponent;
  let fixture: ComponentFixture<SkakalkaMyTrainerAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkakalkaMyTrainerAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkakalkaMyTrainerAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
