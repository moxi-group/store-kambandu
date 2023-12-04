import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { StocksService } from '../stocks.service';
import { ApplicationService } from 'src/app/api/application.service';

@Component({
    selector: 'ListMovimentStockModal',
    templateUrl: './list-moviment-stock.component.html',
    styleUrls: ['./list-moviment-stock.component.scss']
})

export class ListMovimentStockComponent implements OnInit {
    @Input() modal: any = "ListMovimentStockModal"

    stock_moviments: any = []
    @Input() stock: any

    constructor(
        private _stockService: StocksService,
        private _applicationService: ApplicationService
    ) {
    }

    ngOnInit(): void {
        
    }

    ngOnChanges(){
        if ( Boolean(this.stock.uuid ) ) {
            this.loading_init()
        }
    }

    loading_init(){
        this._stockService
        .get_stock_moviments(this.stock.uuid)
        .subscribe(response => {
            this.stock_moviments = Object(response)
        })
    }

    _approve(item: any){
        this._stockService
        .approve_moviment_stock(item.uuid)
        .subscribe(response => {
            this._applicationService.SwalSuccess("Stock aprovado com sucesso!");
            this.loading_init()
        })
    }

    _reject(item: any){
        this._stockService
        .reject_moviment_stock(item.uuid)
        .subscribe(response => {
            this._applicationService.SwalSuccess("Stock regeitado!");
            this.loading_init()
        })
    }

}
