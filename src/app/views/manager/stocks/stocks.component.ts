import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StocksService } from './stocks.service';

@Component({
    selector: 'app-stocks',
    templateUrl: './stocks.component.html',
    styleUrls: ['./stocks.component.scss']
})

export class StocksComponent implements OnInit {
    moviment_stock: any = {}
    stock: any = {}
    product_constitution: any = {}
    
    constructor(
        public _stockService: StocksService,
        public translate: TranslateService
    ) { }

    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this.get_stocks();
    }

    get_stocks() {
        this._stockService
        .get_stocks()
        .subscribe(response => {
            this._stockService.stocks = Object(response)
        })
    }

    pachValue(item: any) {
        this.moviment_stock = item
    }

    pachValueStock(item: any) {
        this.stock = item
    }
}
