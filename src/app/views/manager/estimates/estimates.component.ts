import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationService } from 'src/app/api/application.service';
import { PrintsService } from 'src/app/services/prints.service';
import { InvoicesService } from '../invoices/invoices.service';
import { FilterService } from 'src/app/services/filter.service';

import { saveAs } from 'file-saver';


@Component({
    selector: 'app-estimates',
    templateUrl: './estimates.component.html',
    styleUrls: ['./estimates.component.scss']
})

export class EstimatesComponent implements OnInit {

    _filter: any = {
        page: 1,
        limit: 10,
        order_by: '-created_at',
        filter_column: 'sigla_doc',
        filter_value: 'FP',
        start_date: this.getFirstDateOfLastMonth(),
        end_date: this.getCurrentMonth()
    }

    invoice: any = {}
    invoices: any = []
    loading: boolean = false

    constructor(
        public _filterService: FilterService,
        public _invoicesService: InvoicesService,
        public _printService: PrintsService,
        private _applicationService: ApplicationService,
        public translate: TranslateService
    ) {

    }

    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this._onTableDataChange( this._filter )
    }

    pachValue(item: any) {        
        this.invoice = item
    }

    _search(){
        this.get_invoices()
    }

    _onTableDataChange(filterEmit: any): void{
        
        this.loading = true
        this.get_invoices()
    }

    get_invoices(){
        this._invoicesService
        .get_invoices( this._filter )
        .subscribe(response => {
            this.invoices = Object(response)
            this.loading = false
        })
    }

    _onTableDataChangePage(page: any){
        this._filter.page = page
        this._onTableDataChange( this._filter )
    }

    print(invoice:any) {
        const company_data = sessionStorage.getItem('CURRENT_COMPANY_DATA')
        invoice = Object.assign(invoice, {company: company_data ? JSON.parse(company_data) : {}})
        let created_at = new Date(invoice.created_at)
        invoice.created_at = created_at.toISOString().split('T')[0]

        this._invoicesService
        .print(invoice)
        .subscribe(response => {
            const blob = new Blob([response], { type: 'application/pdf' });
            const blobUrl = URL.createObjectURL(blob);
            const shouldPrint = true; // Replace this with your condition

            if (shouldPrint) {
                // Use window.open for printing
                const printWindow = window.open(blobUrl, '_blank');
                printWindow?.print();
                if (printWindow) {
                    printWindow.onafterprint = () => {
                        // Clean up the URL object after printing
                        URL.revokeObjectURL(blobUrl);
                    };
                }
            } else {
                // Use file-saver library to trigger the download
                saveAs(blobUrl, `${invoice.sigla_doc}.pdf`);
                // Clean up the URL object to release resources
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

    _print_report_invoice() {

        this._printService
            .report_invoice(this._clean_excel_payload(this.invoices) )
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


    getFirstDateOfLastMonth() {
        let today = new Date();
        let lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        let year: any = lastMonth.getFullYear();
        let month: any = lastMonth.getMonth() + 1;
        let day: any = lastMonth.getDate();
      
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
      
        return year + '-' + month + '-' + day;
    }

    getCurrentMonth() {
        let today = new Date();
        let year = today.getFullYear();
        let month: any = today.getMonth() + 1;
        let day: any = today.getDate();
      
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
      
        return year + '-' + month + '-' + day;
    }
      
      
}
