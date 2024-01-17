import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationsComponent } from './variations.component';

describe('VariationsComponent', () => {
  let component: VariationsComponent;
  let fixture: ComponentFixture<VariationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
