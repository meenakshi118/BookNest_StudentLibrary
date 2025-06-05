import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAssignPanelComponent } from './book-assign-panel.component';

describe('BookAssignPanelComponent', () => {
  let component: BookAssignPanelComponent;
  let fixture: ComponentFixture<BookAssignPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAssignPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookAssignPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
