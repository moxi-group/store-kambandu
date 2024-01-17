import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from '../employees.service';
import { ApplicationService } from 'src/app/api/application.service';
import { StoresService } from '../../stores/stores.service';

@Component({
    selector: 'AddEmployeeToStoreModal',
    templateUrl: './add-user-to-store.component.html',
    styleUrls: ['./add-user-to-store.component.scss']
})

export class AddUserToStoreComponent implements OnInit {
    @Input() modal: any = "AddEmployeeToStoreModal"
    @Input() title: string = "Associar Colaborador na Loja"
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
            user_uuid: null,
            store_uuid: [null, Validators.required]
        })
    }

    ngOnInit(): void {
        this.get_stores()
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (this.employee !== undefined) {
            this.employeeForm.patchValue(this.employee);
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

        this.employeeForm.value.user_uuid = this.employee.uuid
        this._associate(this.employeeForm.value)
    }

    _associate(form: FormGroup) {

        this._employeesService.associate_employee_in_store(form)
        .subscribe(response => {
            this._applicationService.CloseModal('AddEmployeeToStoreModal')
            this.submitted = false;
            this.get_employees()
            this._applicationService.SwalSuccess("Utilizador associado com sucesso!");
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
