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
    stocks: any = []
    

    constructor(
        private _serieService: StocksService,
        public translate: TranslateService
    ) { }

    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this.get_series();
    }

    get_series() {
        this._serieService
        .get_stocks()
        .subscribe(response => {
            this.stocks = Object(response)
        })
    }

    pachValue(item: any) {
        this.moviment_stock = item
    }

    pachValueStock(item: any) {
        this.stock = item
    }


}
