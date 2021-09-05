import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VgHerokuWakeupComponent } from './vg-heroku-wakeup.component';

describe('HerokuWakeupComponent', () => {
  let component: VgHerokuWakeupComponent;
  let fixture: ComponentFixture<VgHerokuWakeupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VgHerokuWakeupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VgHerokuWakeupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
