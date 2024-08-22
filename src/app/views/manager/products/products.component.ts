import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProductsService } from './products.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    product: any = {}
    loading: boolean = false

    filter_options: any = [
        {
            value: 'name',
            description: 'Nome'
        },
        {
            value: 'code',
            description: 'Código do produto'
        },
        {
            value: 'created_at',
            description: 'Data'
        }
    ]

    constructor(
        public _filterService: FilterService,
        public _productsService: ProductsService,
        public translate: TranslateService
    ) { }


    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this._onTableDataChange( this._filterService.pagination )
    }

    _onTableDataChange(filterEmit: any): void{
        this.loading = true
        this._filterService.pagination = filterEmit
        this._productsService
        .get_products( this._filterService.pagination )
        .subscribe(response => {
            this._productsService.products_active = Object(response).items.filter((item: any) => item.is_active == true)
            this._productsService.products_inactive = Object(response).items.filter((item: any) => item.is_active == false)
            this.loading = false
        })
    }

    pachValue(item: any) {
        this.product = item
    }

    _total_with_tax(product: any){
        let result = product.price + (product.price * (product.tax.percentage/100) )
        return result
    }


}
