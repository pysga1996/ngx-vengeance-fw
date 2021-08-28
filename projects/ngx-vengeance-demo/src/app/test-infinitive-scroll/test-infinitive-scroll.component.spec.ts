import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInfinitiveScrollComponent } from './test-infinitive-scroll.component';

describe('TestInfinitiveScrollComponent', () => {
  let component: TestInfinitiveScrollComponent;
  let fixture: ComponentFixture<TestInfinitiveScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestInfinitiveScrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInfinitiveScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
