import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfConsumptionComponent } from './self-consumption.component';

describe('SelfConsumptionComponent', () => {
  let component: SelfConsumptionComponent;
  let fixture: ComponentFixture<SelfConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfConsumptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
