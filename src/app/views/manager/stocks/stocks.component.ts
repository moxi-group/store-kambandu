import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StocksService } from './stocks.service';
import { ReporterService } from 'src/app/services/reporter.service';
import { ApplicationService } from 'src/app/api/application.service';

import { saveAs } from 'file-saver';
import { FilterService } from 'src/app/services/filter.service';


@Component({
    selector: 'app-stocks',
    templateUrl: './stocks.component.html',
    styleUrls: ['./stocks.component.scss']
})

export class StocksComponent implements OnInit {
    moviment_stock: any = {}
    stock: any = {}
    product_constitution: any = {}
    loading: boolean = false

    filter: any = {
        pagination: {
            page: 1,
            limit: 20,
            order_by: '-created_at',
            filter_column: null,
            filter_value: null
        }
    }



    constructor(
        public _filterService: FilterService,
        public _stockService: StocksService,
        public _reportService: ReporterService,
        private _applicationService: ApplicationService,
        public translate: TranslateService
    ) { }



    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this._onTableDataChange(this.filter.pagination)
    }

    _onTableDataChange(event: any): void{
        this.filter.pagination.page = Number.isInteger(event) ? event : 1
        this.get_stocks()
    }

    _search(){
        this.get_stocks()
    }

    get_stocks() {
        this.loading = true
        this._stockService
        .get_stocks( this.filter.pagination )
        .subscribe(response => {
            this._stockService.stocks = Object(response)
            this.loading =  false
        })
    }

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
