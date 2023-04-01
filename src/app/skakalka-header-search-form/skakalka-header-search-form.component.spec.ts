import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkakalkaHeaderSearchFormComponent } from './skakalka-header-search-form.component';

describe('SkakalkaHeaderSearchFormComponent', () => {
  let component: SkakalkaHeaderSearchFormComponent;
  let fixture: ComponentFixture<SkakalkaHeaderSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkakalkaHeaderSearchFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkakalkaHeaderSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
