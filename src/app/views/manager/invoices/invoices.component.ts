import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InvoicesService } from './invoices.service';
import { saveAs } from 'file-saver';
import { ApplicationService } from 'src/app/api/application.service';

@Component({
    selector: 'app-invoices',
    templateUrl: './invoices.component.html',
    styleUrls: ['./invoices.component.scss']
})

export class InvoicesComponent implements OnInit {
    invoice: any = {}
    invoices: any = []
    
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
        .get_invoices()
        .subscribe(response => {
            this.invoices = Object(response)
        })
    }

    print(invoice:any) {
        const company_data = sessionStorage.getItem('CURRENT_COMPANY_DATA')
        invoice = Object.assign(invoice, {company: company_data ? JSON.parse(company_data) : {}})
        let created_at = new Date(invoice.created_at)
        invoice.created_at = created_at.toISOString().split('T')[0]
        
        this._invoicesService
        .print(invoice)
        .subscribe(response => {
            // var blob = new Blob([response], {type: "application/pdf"});
            // saveAs(blob, `${invoice.sigla_doc}.pdf`);
            // Create a Blob object from the response
            const blob = new Blob([response], { type: 'application/octet-stream' });

            // Generate a URL for the Blob
            const blobUrl = URL.createObjectURL(blob);

            // Use the file-saver library to trigger the download
            saveAs(blobUrl, `${invoice.sigla_doc}.pdf`);

            // Clean up the URL object to release resources
            URL.revokeObjectURL(blobUrl);
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
