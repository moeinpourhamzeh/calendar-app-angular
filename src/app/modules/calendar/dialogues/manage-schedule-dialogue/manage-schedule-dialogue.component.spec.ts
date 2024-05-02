import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageScheduleDialogueComponent } from './manage-schedule-dialogue.component';

describe('ManageScheduleDialogueComponent', () => {
  let component: ManageScheduleDialogueComponent;
  let fixture: ComponentFixture<ManageScheduleDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageScheduleDialogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageScheduleDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
