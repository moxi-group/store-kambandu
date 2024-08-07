import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../products/products.service';
import { ApplicationService } from 'src/app/api/application.service';
import { StoresService } from '../../../stores/stores.service';
import { CompostionsService } from '../compositions.service';

@Component({
    selector: 'app-composer-edit',
    templateUrl: './composer-edit.component.html',
    styleUrls: ['./composer-edit.component.scss']
})

export class ComposerEditComponent implements OnInit {
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
        this.get_products()
        this.get_stores()

        this.product_uuid = product_uuid
        this.get_product(product_uuid)
    }

    ngOnInit(): void {
    }

    get_product(uuid: string){
        this._productService
        .get_product(uuid)
        .subscribe(response => {            
            this.product = Object(response)
            this.loading = false
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

    get_stores() {
        this._storeService
        .get_stores()
        .subscribe(response => {
            let results = Object(response)
            this.stores = results

            if ( results.length ) {
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
        })
    }

    _get_compositions_product(){
        this._compostionsService
        .get_compositions_product( this.stock.uuid )
        .subscribe(response => {
            let results = Object(response)
            this.validate_composition( results )           
        })
    }

    validate_composition(all_products: any){    
        
        if ( all_products.length ) {
            let uniq_all_products = this.products.filter((obj1: any) => !all_products.some((obj2: any) => obj2.product.uuid === obj1.uuid) );
            
            uniq_all_products = uniq_all_products.map((item: any) => ({
                name: item.name,
                code: item.code,
                price: item.price,
                is_stocked: item.is_stocked,
                uuid: item.uuid,
                quantity: 1
            }))
            
            this.available_products = uniq_all_products

            let uniq_associated_products = all_products.map((item: any) => ({
                name: item.product.name,
                code: item.product.code,
                price: item.product.price,
                is_stocked: item.product.is_stocked,
                uuid: item.product_uuid,
                quantity: item.quantity
            }))

            this.associated_products = uniq_associated_products
            
        }
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
                this._applicationService.SwalSuccess("Composição atualizada com sucesso!");
                this.onReset()
                this.router.navigateByUrl('/managers/products')
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
    }

    _cancel() {
        this.onReset()
        this.router.navigateByUrl('/managers/products')
    }


}
