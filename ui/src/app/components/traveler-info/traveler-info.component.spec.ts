import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelerInfoComponent } from './traveler-info.component';

describe('TravelerInfoComponent', () => {
  let component: TravelerInfoComponent;
  let fixture: ComponentFixture<TravelerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelerInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TravelerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
