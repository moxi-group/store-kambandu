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
    products: any = []

    constructor(
        private _productsService: ProductsService,
        public translate: TranslateService
    ) { }


    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this.get_series();
    }

    get_series() {
        this._productsService
        .get_products()
        .subscribe(response => {
            this.products = Object(response)
        })
    }

    pachValue(item: any) {
        this.product = item
    }


}
