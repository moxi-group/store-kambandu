import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditTemplateCompanyComponent } from './create-or-edit-template-company.component';

describe('CreateOrEditTemplateCompanyComponent', () => {
  let component: CreateOrEditTemplateCompanyComponent;
  let fixture: ComponentFixture<CreateOrEditTemplateCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrEditTemplateCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditTemplateCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
