import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VgFileInputComponent } from './vg-file-input.component';

describe('FileInputComponent', () => {
  let component: VgFileInputComponent;
  let fixture: ComponentFixture<VgFileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VgFileInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VgFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
