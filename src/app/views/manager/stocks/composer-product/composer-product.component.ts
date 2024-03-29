import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductsService } from '../../products/products.service';
import { ApplicationService } from 'src/app/api/application.service';
import { StocksService } from '../stocks.service';

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
    disabled_check = false
    loading: boolean = false

    association_products: any = []
    composed_products: any = []

    constructor(
        private _productService: ProductsService,
        private _applicationService: ApplicationService,
        private _stockService: StocksService,
        private _formBuild: FormBuilder
    ) {
        this.composerForm = this._formBuild.group({
            provider_uuid: [null],
            product_uuid: [null],
        })
    }

    ngOnInit(): void {
    }


    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        this.get_products_map()
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

        //this._create()
    }

    _create() {
        let products = this.composed_products.map((item: any) => ({
            stock_uuid: item.stock_uuid,
            product_uuid: item.product_uuid,
            quantity: item.quantity
        }))

        this._stockService.associate_composition(products, this.stock.product_uuid)
        .subscribe(response => {
            this.submitted = false;

            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })

    }

    _set_associate_product(product: any){
        let exist = this.composed_products.find((item: any) => item.product_uuid === product.product_uuid)

        if( exist ){
            product.quantity = 1
            this.composed_products = this.composed_products
            .filter((line: any) => line.product_uuid !== product.product_uuid)
        } else {
            this.composed_products.push( product )
        }
    }

    _set_quantity(event: any, product: any){
        let quantity = event.target.value

        if (Boolean(quantity)) {
            product.quantity = quantity
            return
        }
        product.quantity = 1
    }

    get_products_map() {
        this.loading = true
        this._productService
        .get_products()
        .subscribe(response => {
            let result = Object(response)

            this.association_products = result.items.map((product: any) => ({
                stock_uuid: this.stock.uuid,
                product_uuid: product.uuid,
                name: product.name,
                quantity: 1,
                cheked: false
            }))

            this.loading = false
        })
    }


    /*




        if ( this.productForm.getRawValue().is_composed && this.composed_products.length === 0) {
            this._applicationService.SwalDangerConfirmation("Produtos compostos devem ter os seus associados!");
            return;
        }

        this.productForm.patchValue({
            composed_products: this.composed_products.map((product: any) => ({
                product_uuid: product.product_uuid,
                quantity: Number(product.quantity),
                stock_uuid: null
            }))
        })

            _check_use_stock(){
        if (this.productForm.getRawValue().is_composed) { //checked
            this.disabled_check = true
            //this.productForm.getRawValue().composed_products = []
        } else {
            this.disabled_check = false
        }
    }









    */

}
