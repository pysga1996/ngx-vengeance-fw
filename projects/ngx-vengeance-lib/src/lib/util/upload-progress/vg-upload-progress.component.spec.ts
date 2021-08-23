import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VgUploadProgressComponent} from './vg-upload-progress.component';

describe('UploadProgressComponent', () => {
  let component: VgUploadProgressComponent;
  let fixture: ComponentFixture<VgUploadProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VgUploadProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VgUploadProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
