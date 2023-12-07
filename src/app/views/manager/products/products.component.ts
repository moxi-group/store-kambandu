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

    constructor(
        public _productsService: ProductsService,
        public translate: TranslateService
    ) { }


    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this.get_products();
    }

    get_products() {
        this._productsService
        .get_products()
        .subscribe(response => {
            this._productsService.products = Object(response)
        })
    }

    pachValue(item: any) {
        this.product = item
    }


}
