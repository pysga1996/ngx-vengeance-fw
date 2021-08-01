import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VgToastComponent } from './vg-toast.component';

describe('ToastComponent', () => {
  let component: VgToastComponent;
  let fixture: ComponentFixture<VgToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VgToastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VgToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
