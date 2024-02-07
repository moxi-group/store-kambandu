import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';
import { ReportsService } from '../reports.service';
import { saveAs } from 'file-saver';
import { PrintsService } from 'src/app/services/prints.service';
import { ApplicationService } from 'src/app/api/application.service';

@Component({
    selector: 'app-billing',
    templateUrl: './billing.component.html',
    styleUrls: ['./billing.component.scss']
})

export class BillingComponent implements OnInit {
    
    loading: boolean = false
    report_list: any = []

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
        public _printService: PrintsService,
        private _reportsService: ReportsService,
        private _applicationService: ApplicationService,
        public _filterService: FilterService
    ) { }

    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this._onTableDataChange(this.filter.pagination)
    }

    _onTableDataChange(event: any): void{
        this.filter.pagination.page = Number.isInteger(event) ? event : 1
        this.get_reports()
    }

    get_reports(){
        this._reportsService
        .reports_billigs(this._filterService.pagination)
        .subscribe(response => {
            this.report_list = Object(response)
            this.loading = false
        })
    }

    _onTableDataChangePage(page: any){
        this._filterService.pagination.page = page
        this._onTableDataChange( this._filterService.pagination )
    }

    _print_report_invoice() {
        this._printService
            .report_invoice(this._clean_excel_payload(this.report_list) )
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

    _clean_excel_payload(items:any){
        items = Object.assign({}, items);
        let data = items['items']
        for (let index = 0; index < data.length; index++) {

            delete data[index].payments;
            delete data[index].lines;
            delete data[index].taxes_resume;

        }

        return items
    }

}
