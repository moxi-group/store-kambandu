import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StocksService } from '../stocks.service';
import { ApplicationService } from 'src/app/api/application.service';
import { ProductsService } from '../../products/products.service';
import { ProvidersService } from '../../providers/providers.service';
import { StoresService } from '../../stores/stores.service';

@Component({
    selector: 'CreateMovimentStockModal',
    templateUrl: './create-moviment-stock.component.html',
    styleUrls: ['./create-moviment-stock.component.scss']
})

export class CreateMovimentStockComponent implements OnInit {
    @Input() modal: any = "CreateMovimentStockModal"
    @Input() title: string = "Movimentar Stock"
    @Input() moviment_stock: any
    @Input() movimentStockForm: FormGroup

    submitted = false
    products: any = []
    providers: any = []
    stores: any = []
    
    constructor(
        private _stockService: StocksService,
        private _productService: ProductsService,
        private _providerService: ProvidersService,
        private _storeService: StoresService,
        private _applicationService: ApplicationService,
        private _formBuild: FormBuilder
    ) {
        this.movimentStockForm = this._formBuild.group({
            uuid: [{ value: null, disabled: true }],
            quantity: [ 1, Validators.required ],
            kind_moviment: ["entrada", Validators.required],
            provider_uuid: [null, Validators.required],
            product_uuid: [null, Validators.required],
            store_uuid: [null, Validators.required]
        })

        this.loading_init()
    }

    loading_init(){
        this._productService
        .get_products()
        .subscribe(response => {
            this.products = Object(response)
        })

        this._providerService
        .get_providers()
        .subscribe(response => {
            this.providers = Object(response)
        })

        this._storeService
        .get_stores()
        .subscribe(response => {
            this.stores = Object(response)
        })

        this._stockService
        .get_stocks()
        .subscribe(response => {
            this._stockService.stocks = Object(response)
        })
    }


    ngOnInit(): void {
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (this.moviment_stock !== undefined) {
            this.title = "Movimentar Stock";
            this.movimentStockForm.patchValue(this.moviment_stock);
        } else {
            this.title = "Movimentar Stock";
        }
    }

    get f() {
        return this.movimentStockForm.controls;
    }

    onReset() {
        this.submitted = false;
        this.movimentStockForm.reset();
    }

    onSubmit() {
        this.submitted = true
        if (this.movimentStockForm.invalid) {
            return;
        }

        this._create(this.movimentStockForm.value)
    }

    _create(form: FormGroup) {
        this._stockService.create_stock_moviment(form)
        .subscribe(response => {
            this.submitted = false;
            this._applicationService.SwalSuccess("Registo feito com sucesso!");
            this.onReset()
        })
    }



}
