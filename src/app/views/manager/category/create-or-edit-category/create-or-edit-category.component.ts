import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/api/application.service';
import { CategoriesService } from '../categories.service';

@Component({
    selector: 'CreateOrEditCategoryModal',
    templateUrl: './create-or-edit-category.component.html',
    styleUrls: ['./create-or-edit-category.component.scss']
})

export class CreateOrEditCategoryComponent implements OnInit {
    @Input() modal: any = "CreateOrEditCategoryModal"
    @Input() title: string = "Registar de Categoria"
    @Input() category: any
    @Input() categoryForm: FormGroup

    submitted = false

    constructor(
        private _categoryService: CategoriesService,
        private _applicationService: ApplicationService,
        private _formBuild: FormBuilder
    ) {
        this.categoryForm = this._formBuild.group({
            uuid: [{ value: null, disabled: true }],
            name: [null, Validators.required],
            description: [null, Validators.required]
        })
    }

    ngOnInit(): void {
    }


    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (this.category !== undefined) {
            this.title = "Registo de Categoria";
            this.categoryForm.patchValue(this.category);
        } else {
            this.title = "Atualizar Categoria";
        }
    }

    get f() {
        return this.categoryForm.controls;
    }

    onReset() {
        this.submitted = false;
        this.categoryForm.reset();
    }

    onSubmit() {
        this.submitted = true
        if (this.categoryForm.invalid) {
            return;
        }

        if ( Boolean(this.categoryForm.getRawValue().uuid) ) {
            this._update(this.categoryForm.getRawValue().uuid, this.categoryForm.value)
        } else {
            this._create(this.categoryForm.value)
        }
    }

    _create(form: FormGroup) {
        this._categoryService.create(form)
        .subscribe(response => {
            this.submitted = false;
            this.get_categories()
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }

    _update(uuid: string, form: FormGroup){
        this._categoryService.update(uuid, form)
        .subscribe(res => {
            this.submitted = false;
            this.get_categories()
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }

    get_categories() {
        this._categoryService
        .get_categories()
        .subscribe(response => {
            this._categoryService.get_categories = Object(response)
        })
    }

}
