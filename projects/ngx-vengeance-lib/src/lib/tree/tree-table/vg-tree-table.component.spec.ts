import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VgTreeTableComponent } from './vg-tree-table.component';

describe('TreeTableComponent', () => {
  let component: VgTreeTableComponent;
  let fixture: ComponentFixture<VgTreeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VgTreeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VgTreeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
