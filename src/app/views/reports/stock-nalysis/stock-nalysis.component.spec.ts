import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockNalysisComponent } from './stock-nalysis.component';

describe('StockNalysisComponent', () => {
  let component: StockNalysisComponent;
  let fixture: ComponentFixture<StockNalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockNalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockNalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
