import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    product: any = {}

    filter: any = {
        page: 1,
        limit: 5,
        order_by: 'name',
        filter_column: null,
        filter_value: ''
    }

    constructor(
        public _productsService: ProductsService,
        public translate: TranslateService
    ) { }


    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this._onTableDataChange(1)
    }

    _onTableDataChange(event: any): void{
        this.filter.page = Number.isInteger(event) ? event : 1 
        this.get_products()
    }

    get_products() {
        this._productsService
        .get_products(this.filter)
        .subscribe(response => {
            this._productsService.products = Object(response)
        })
    }



    pachValue(item: any) {
        this.product = item
    }


}
