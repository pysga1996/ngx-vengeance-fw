import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VgTreeTableItemComponent } from './vg-tree-table-item.component';

describe('TreeTableItemComponent', () => {
  let component: VgTreeTableItemComponent;
  let fixture: ComponentFixture<VgTreeTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VgTreeTableItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VgTreeTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
