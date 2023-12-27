import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InvoicesService } from './invoices.service';
import { ApplicationService } from 'src/app/api/application.service';
import { saveAs } from 'file-saver';


@Component({
    selector: 'app-invoices',
    templateUrl: './invoices.component.html',
    styleUrls: ['./invoices.component.scss']
})

export class InvoicesComponent implements OnInit {
    invoice: any = {}
    invoices: any = []
    
    filter: any = {
        page: 1,
        limit: 10,
        order_by: 'sigla_doc'
    }

    constructor(
        public _invoicesService: InvoicesService,
        private _applicationService: ApplicationService,
        public translate: TranslateService
    ) { }

    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this.get_invoices();
    }

    get_invoices() {
        this._invoicesService
        .get_invoices( this.filter )
        .subscribe(response => {
            this.invoices = Object(response)
        })
    }

    _onTableDataChange(event: any): void{

        console.log( event )
        
        this.filter = {
            limit: event,
            page: 1
        }

        this.get_invoices()
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

    pachValue(item: any) {
        this.invoice = item
    }

    reset_lines(){
        this._invoicesService.invoiceObject.lines = []
    }

    progressbar(total: number, open_amount: number){
        let result = (((total - open_amount) * 100) /(total))
        return parseInt(result.toString())
    }

}
