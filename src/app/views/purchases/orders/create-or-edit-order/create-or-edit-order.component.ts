import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/api/application.service';
import { ProductsService } from 'src/app/views/manager/products/products.service';
import { ProvidersService } from '../../providers/providers.service';
import { StoresService } from 'src/app/views/manager/stores/stores.service';

@Component({
    selector: 'app-create-or-edit-order',
    templateUrl: './create-or-edit-order.component.html',
    styleUrls: ['./create-or-edit-order.component.scss']
})
export class CreateOrEditOrderComponent implements OnInit {
    
    orderForm: any = FormGroup
    result: any

    submitted = false
    providers: any = []
    products: any = []
    stores: any = []

    constructor(
        public _formBuild: FormBuilder,
        private _storeService: StoresService,
        private _applicationService: ApplicationService,
        private _productService: ProductsService,
        private _providerService: ProvidersService,
        private router: Router
    ) {
        this.loading()
    }

    ngOnInit(): void {
        this.creatForm()
    }


    creatForm(){
        this.orderForm = this._formBuild.group({
            contacts: this._formBuild.array([this.contactFrom()])
        });
    }

    contactFrom(){
        return this._formBuild.group({
            uuid: [{ value: null, disabled: true }],
            quantity: [ 1, Validators.required ],
            kind_moviment: ['entrada', Validators.required],
            provider_uuid: [null, Validators.required],
            product_uuid: [null, Validators.required],
            store_uuid: [null, Validators.required],
            purchase_price: [0],
        })
    }

    loading(){

        this.get_providers()
        this.get_products()
        this.get_stores()

    }

    get_providers(){
        this._providerService
        .get_providers()
        .subscribe(response => {
            this.providers = Object(response)
        })
    }

    get_stores(){
        this._storeService
        .get_stores()
        .subscribe(response => {
            this.stores = Object(response)
        })
    }

    get_products(){
        this._productService
        .get_products()
        .subscribe(response => {
            this.products = Object(response).items
        })
    }


}
