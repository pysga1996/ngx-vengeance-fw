import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VgScrollerComponent } from './vg-scroller.component';

describe('ItemScrollerComponent', () => {
  let component: VgScrollerComponent;
  let fixture: ComponentFixture<VgScrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VgScrollerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VgScrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
