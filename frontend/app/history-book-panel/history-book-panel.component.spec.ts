import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryBookPanelComponent } from './history-book-panel.component';

describe('HistoryBookPanelComponent', () => {
  let component: HistoryBookPanelComponent;
  let fixture: ComponentFixture<HistoryBookPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryBookPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryBookPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
