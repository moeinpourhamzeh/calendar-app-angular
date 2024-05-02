import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarLandingComponent } from './calendar-landing.component';

describe('CalendarMainComponent', () => {
  let component: CalendarLandingComponent;
  let fixture: ComponentFixture<CalendarLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
