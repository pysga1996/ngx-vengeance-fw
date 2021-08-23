import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VgLoaderComponent } from './vg-loader.component';

describe('VgLoaderComponent', () => {
  let component: VgLoaderComponent;
  let fixture: ComponentFixture<VgLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VgLoaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VgLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
