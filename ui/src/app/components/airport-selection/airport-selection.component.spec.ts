import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportSelectionComponent } from './airport-selection.component';

describe('AirportSelectionComponent', () => {
  let component: AirportSelectionComponent;
  let fixture: ComponentFixture<AirportSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirportSelectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AirportSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
