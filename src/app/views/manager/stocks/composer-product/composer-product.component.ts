import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductsService } from '../../products/products.service';
import { ApplicationService } from 'src/app/api/application.service';

@Component({
    selector: 'ComposerProductkModal',
    templateUrl: './composer-product.component.html',
    styleUrls: ['./composer-product.component.scss']
})

export class ComposerProductComponent implements OnInit {
    @Input() modal: any = "ComposerProductkModal"
    @Input() title: string = "Configurar Produto - Composto"
    @Input() composerForm: FormGroup
    @Input() stock: any

    

    submitted = false
    products: any = []

    constructor(
        private _productService: ProductsService,
        private _applicationService: ApplicationService,
        private _formBuild: FormBuilder
    ) {
        this.composerForm = this._formBuild.group({
            provider_uuid: [null, Validators.required],
            product_uuid: [null, Validators.required],
        })
    }

    ngOnInit(): void {
    }


    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {

    }

    get f() {
        return this.composerForm.controls;
    }

    onReset() {
        this.submitted = false;
        this.composerForm.reset();
    }

    onSubmit() {
        this.submitted = true
        if (this.composerForm.invalid) {
            return;
        }

        this._create(this.composerForm.value)
    }

    _create(form: FormGroup) {
        /*
        this._stockService.create_stock_moviment(form)
        .subscribe(response => {
            this.submitted = false;
            this.loading_init()
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
        */
    }

}
