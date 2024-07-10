import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApplicationService } from 'src/app/api/application.service';
import { ProductsService } from '../../../products/products.service';
import { StoresService } from '../../../stores/stores.service';
import { CompostionsService } from '../compositions.service';

@Component({
    selector: 'app-composer-create',
    templateUrl: './composer-create.component.html',
    styleUrls: ['./composer-create.component.scss']
})

export class ComposerCretaeComponent implements OnInit {
    loading: boolean = false
    submitted = false

    product_uuid: string = ''
    product: any = {}
    store: any = {}
    stock: any = {}

    available_products: any = []
    associated_products: any = []
    products: any = []
    stores: any = []

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _productService: ProductsService,
        private _applicationService: ApplicationService,
        private _compostionsService: CompostionsService,
        public _storeService: StoresService
    ) {
        const product_uuid: string = route.snapshot.params.product_uuid
        this.product_uuid = product_uuid
        this._init_(product_uuid)
    }


    ngOnInit(): void {
        
    }

    _init_(uuid: string){
        this._productService
        .get_product(uuid)
        .subscribe(response => {            
            let product = Object(response)
            this.product = Object(response)
            
            if ( Boolean( product.is_stocked ) ) {
                this.get_stores()
            }
        })
    }

    get_stores() {
        this._storeService
        .get_stores()
        .subscribe(response => {
            let results = Object(response)   
                     
            if ( results.length ) {
                this.stores = results
                this.store = results[0]
                this.get_stock()
            }
        })
    }

    get_stock() {             
        this._compostionsService
        .get_stock_of_store(
            this.product_uuid, 
            this.store.uuid
        )
        .subscribe(response => {
            this.stock = Object(response)  
            this._get_compositions_product()             
            this.loading = false
        })
    }

    _get_compositions_product(){
        this._compostionsService
        .get_compositions_product( this.stock.uuid )
        .subscribe(response => {
            let results = Object(response)
                        
            if ( results.length ) {
                this.router.navigateByUrl(`/managers/products/composer/${this.product_uuid}/edit`)
            } else {
                this.get_products()
            }
        })
    }

    get_products(){
        this.loading = true

        this._productService
        .get_products()
        .subscribe(response => {  
            let products = Object(response).items

            if ( products.length ) {
                let products_part_of_composed = products.filter((item: any) => item.is_part_of_composed === true)
                this.products = products_part_of_composed
                this.available_products = products_part_of_composed
            }   
            this.loading = false         
        })
    }


    _add_to_list(product: any){
        this.available_products = this.available_products
        .filter((line: any) => line.uuid != product.uuid)

        product.quantity = 1
        this.associated_products.push(product)
    }

    _remove_product(product: any){
        this.associated_products = this.associated_products
        .filter((line: any) => line.uuid != product.uuid)

        this.available_products.push(product)
    }
    
    _set_quantity(event: any, product: any){
        let quantity = event.target.value

        if (Boolean(quantity)) {
            product.quantity = quantity
            return
        }
        product.quantity = 1
    }

    _create() {
        this.submitted = true        
        
        let products = this.associated_products.map((item: any) => ({
            stock_uuid: this.stock.uuid,
            product_uuid: item.uuid,
            quantity: Number(item.quantity)
        }))


        if ( products.length ) {
            this._compostionsService.create(products, this.product_uuid)
            .subscribe(response => {
                this.submitted = false;                
                this._applicationService.SwalSuccess("Registo feito com sucesso!");
                this.onReset()
            })
        } else {
            this._applicationService.SwalDanger('Não há produtos na composição');
            return
        }
    }

    onReset() {
        this.submitted = false;
        this.available_products = []
        this.associated_products = []
        this.router.navigateByUrl('/managers/products')
    }







}
