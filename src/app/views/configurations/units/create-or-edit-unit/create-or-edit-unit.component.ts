import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnitsService } from '../unit.service';
import { TaxesService } from 'src/app/views/configurations/taxes/taxes.service';
import { ApplicationService } from 'src/app/api/application.service';

@Component({
  selector: 'CreateOrEditUnitModal',
  templateUrl: './create-or-edit-unit.component.html',
  styleUrls: ['./create-or-edit-unit.component.scss'],
})
export class CreateOrEditUnitComponent implements OnInit {
  @Input() modal: any = 'CreateOrEditUnitModal';
  @Input() title: string = 'Registar Unidades';
  @Input() product: any;
  @Input() productForm: FormGroup;

  submitted = false;
  taxes: any = [];
  categories: any = [];
  association_products: any = [];
  disabled_check: boolean = true;

  constructor(
    public _unitsService: UnitsService,
    private _taxesService: TaxesService,
    private _applicationService: ApplicationService,
    private _formBuild: FormBuilder
  ) {
    this.productForm = this._formBuild.group({
      uuid: [{ value: null, disabled: true }],
      name: [null, Validators.required],
      description: [null, Validators.required],
      is_active: true,
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.product !== undefined) {
      this.title = 'Registar Unidades';
      this.productForm.patchValue(this.product);
    } else {
      this.title = 'Atualizar Unidades';
    }
  }

  get f() {
    return this.productForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.productForm.reset();
  }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }

    if (Boolean(this.productForm.getRawValue().uuid)) {
      this._update(this.productForm.getRawValue().uuid, this.productForm.value);
    } else {
      this._create(this.productForm.value);
    }
  }

  _create(form: FormGroup) {
    this._unitsService.create(form).subscribe((response) => {


      this.submitted = false;
      this.get_products();
      this._applicationService.SwalSuccess('Registo feito com sucesso!');
      this.onReset();
    });
  }

  _update(uuid: string, form: FormGroup) {
    this._unitsService.update(uuid, form).subscribe((res) => {
      this.submitted = false;
      this.get_products();
      this._applicationService.SwalSuccess('Registo feito com sucesso!');
      this.onReset();
    });
  }

  get_taxes() {
    this._taxesService.get_taxes().subscribe((response) => {
      this.taxes = Object(response);
    });
  }


  get_products() {
    this._unitsService.get_units().subscribe((response) => {
      console.log(response);
      this._unitsService.units = Object(response);
    });
  }
}
