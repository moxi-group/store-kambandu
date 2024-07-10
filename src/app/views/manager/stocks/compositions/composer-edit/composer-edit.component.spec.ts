import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposerEditComponent } from './composer-edit.component';

describe('ComposerEditComponent', () => {
  let component: ComposerEditComponent;
  let fixture: ComponentFixture<ComposerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComposerEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
