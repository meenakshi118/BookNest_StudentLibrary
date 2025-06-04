import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailPanelComponent } from './book-detail-panel.component';

describe('BookDetailPanelComponent', () => {
  let component: BookDetailPanelComponent;
  let fixture: ComponentFixture<BookDetailPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetailPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDetailPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
