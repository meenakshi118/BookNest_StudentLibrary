import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnBookPanelComponent } from './return-book-panel.component';

describe('ReturnBookPanelComponent', () => {
  let component: ReturnBookPanelComponent;
  let fixture: ComponentFixture<ReturnBookPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnBookPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnBookPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
