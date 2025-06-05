import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListPanelComponent } from './student-list-panel.component';

describe('StudentListPanelComponent', () => {
  let component: StudentListPanelComponent;
  let fixture: ComponentFixture<StudentListPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentListPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentListPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
