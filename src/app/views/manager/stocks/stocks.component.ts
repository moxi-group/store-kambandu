import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StocksService } from './stocks.service';
import { ReporterService } from 'src/app/services/reporter.service';
import { ApplicationService } from 'src/app/api/application.service';

import { saveAs } from 'file-saver';


@Component({
    selector: 'app-stocks',
    templateUrl: './stocks.component.html',
    styleUrls: ['./stocks.component.scss']
})

export class StocksComponent implements OnInit {
    moviment_stock: any = {}
    stock: any = {}
    product_constitution: any = {}
    
    filter: any = {
        page: 1,
        limit: 5,
        order_by: '-created_at',
        filter_column: null,
        filter_value: ''
    }

    constructor(
        public _stockService: StocksService,
        public _reportService: ReporterService,
        private _applicationService: ApplicationService,
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
        this.get_stocks()
    }


    get_stocks() {
        this._stockService
        .get_stocks( this.filter )
        .subscribe(response => {
            console.log( response )
            this._stockService.stocks = Object(response)
        })
    }

    /*
    _onTableDataChange(filterEmit: any): void{
        this._filterService.pagination = filterEmit
        this._stockService
        .get_stocks( this._filterService.pagination )
        .subscribe(response => {
            this._stockService.stocks = Object(response)
        })
    }
    */

    pachValue(item: any) {
        this.moviment_stock = item
    }

    pachValueStock(item: any) {
        this.stock = item
    }

    _print_report_stock() {

        this._reportService
            .report_stock( this._stockService.stocks )
        .subscribe(response => {
            const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const blobUrl = URL.createObjectURL(blob);
            const shouldPrint = false;

            if (shouldPrint) {
                const printWindow = window.open(blobUrl, '_blank');
                printWindow?.print();
                if (printWindow) {
                    printWindow.onafterprint = () => {
                        URL.revokeObjectURL(blobUrl);
                    };
                }
            } else {
                saveAs(blobUrl, `resumo-report-${Date.now()}.xlsx`);
                URL.revokeObjectURL(blobUrl);
            }
            
        }, (error) => {
            if ( error.status === 404) {
                this._applicationService.SwalDanger('Template de Imprensão não encontrado')
            } else {
                this._applicationService.SwalDanger('Problemas ao se conectar ao serviço externo')
            }
        })
    }

}
