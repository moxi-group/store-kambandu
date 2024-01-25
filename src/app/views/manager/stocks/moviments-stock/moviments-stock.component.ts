import { Component, OnInit } from '@angular/core';
import { StocksService } from '../stocks.service';
import { FilterService } from 'src/app/services/filter.service';
import { ReporterService } from 'src/app/services/reporter.service';
import { saveAs } from 'file-saver';
import { ApplicationService } from 'src/app/api/application.service';

@Component({
    selector: 'app-moviments-stock',
    templateUrl: './moviments-stock.component.html',
    styleUrls: ['./moviments-stock.component.scss']
})

export class MovimentsStockComponent implements OnInit {

    loading: boolean = false
    moviments_stocks: any = []

    filter: any = {
        pagination: {
            page: 1,
            limit: 10,
            order_by: '-created_at',
            filter_column: null,
            filter_value: null,
            start_date: this._filterService.startOfMonth(),
            end_date: this._filterService.currentOfMonth()
        }
    }

    constructor(
        public _reportService: ReporterService,
        private _applicationService: ApplicationService,
        public _filterService: FilterService,
        private _stockService: StocksService
    ) { }

    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this._onTableDataChange(this.filter.pagination)
    }

    _onTableDataChange(event: any): void{
        this.filter.pagination.page = Number.isInteger(event) ? event : 1
        this.get_moviments_stocks()
    }

    get_moviments_stocks() {
        this.loading = true
        this._stockService
        .get_moviments_stock( this.filter.pagination )
        .subscribe(response => {
            this.moviments_stocks = Object(response)
            this.loading =  false
        })
    }

    _search(){
        this.get_moviments_stocks()
    }

    _print_report_moviment_stock() {

        this._reportService
        .report_moviments_stocks( this.moviments_stocks )
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
                saveAs(blobUrl, `movimentos-stocks-report-${Date.now()}.xlsx`);
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


