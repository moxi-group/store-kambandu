import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/api/application.service';
import { EmployeesService } from '../employees.service';
import { StoresService } from '../../stores/stores.service';

@Component({
    selector: 'CreateOrEditEmployeeModal',
    templateUrl: './create-or-edit-employee.component.html',
    styleUrls: ['./create-or-edit-employee.component.scss']
})
export class CreateOrEditEmployeeComponent implements OnInit {
    @Input() modal: any = "CreateOrEditEmployeeModal"
    @Input() title: string = "Registar Colaborador"
    @Input() employee: any
    @Input() employeeForm: FormGroup

    submitted = false
    stores: any = []

    constructor(
        private _employeesService: EmployeesService,
        private _storesService: StoresService,
        private _applicationService: ApplicationService,
        private _formBuild: FormBuilder
    ) {
        this.employeeForm = this._formBuild.group({
            uuid: [{ value: null, disabled: true }],
            name: [null, Validators.required],
            email: [null, Validators.required],
            password: ['123456'],
            phone_number: [null, Validators.required]
        })
    }
    
    ngOnInit(): void {
        this.get_stores()
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (this.employee !== undefined) {
            this.title = "Registar Colaborador";
            this.employeeForm.patchValue(this.employee);
        } else {
            this.title = "Atualizar Colaborador";
        }
    }

    get f() {
        return this.employeeForm.controls;
    }

    onReset() {
        this.submitted = false;
        this.employeeForm.reset();
    }

    onSubmit() {
        this.submitted = true
        if (this.employeeForm.invalid) {
            return;
        }

        if ( Boolean(this.employeeForm.getRawValue().uuid) ) {
            this._update(this.employeeForm.getRawValue().uuid, this.employeeForm.value)
        } else {
            this._create(this.employeeForm.value)
        }
    }

    _create(form: FormGroup) {
        this._employeesService.create(form)
        .subscribe(response => {
            this._applicationService.CloseModal('CreateOrEditEmployeeModal')
            this.submitted = false;
            this.get_employees()
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }

    _update(uuid: string, form: FormGroup){
        this._employeesService.update(uuid, form)
        .subscribe(res => {
            this._applicationService.CloseModal('CreateOrEditEmployeeModal')
            this.submitted = false;
            this.get_employees()
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }

    get_employees() {
        this._employeesService
        .get_employees()
        .subscribe(response => {
            this._employeesService.employees = Object(response)
        })
    }

    get_stores() {
        this._storesService
        .get_stores()
        .subscribe(response => {
            this.stores = Object(response)
        })
    }

}
