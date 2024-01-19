import { Component, OnInit } from '@angular/core';
import { SaftService } from './saft.service';
import { TranslateService } from '@ngx-translate/core';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-saft-ao',
    templateUrl: './saft-ao.component.html',
    styleUrls: ['./saft-ao.component.scss']
})
export class SaftAoComponent implements OnInit {
    saft: any = {}

    constructor(
        public _saftService: SaftService,
        public translate: TranslateService
    ) { }

    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this.get_series();
    }

    get_series() {
        this._saftService
        .get_safts()
        .subscribe(response => {
            this._saftService.safts = Object(response)
        })
    }

    _download(item: any) {
        this._saftService
        .download(item.uuid)
 
        .subscribe(response => {



            
            //let file = response
            console.log('response')
            //this._print_xml_saft( response )
           
        })

    

         
    }

    _print_xml_saft(file: any){
        console.log( file )
        const blob = new Blob([file], { type: 'application/xml' });
        const blobUrl = URL.createObjectURL(blob);

        saveAs(blobUrl, `${new Date()}.xml`);

        /*
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

        */
    }

}
