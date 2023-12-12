import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { saveAs } from 'file-saver';
import { ApplicationService } from 'src/app/api/application.service';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
    customer: any
    serie: any

    total_without_tax: number = 0
    total_received: number = 0
    total_tax: number = 0
    total: number = 0

    invoiceObject: any = {
        uuid: null,
        customer_uuid: null,
        serie_uuid: null,
        lines: [],
        store_uuid: '13877b6d-5481-4676-90db-277298049e31',
        payment_lines: []
    }
    
    constructor(
        private _applicationService: ApplicationService,
        private _http_client: HttpClient
    ) { }

    private token = sessionStorage.getItem('sessionToken')
    private companyToken = sessionStorage.getItem('CURRENT_COMPANY')


    public headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `Bearer ${this.token}`)
    .set('header-company-uuid', `${this.companyToken}`)

    get_invoices() {
        return this._http_client.get<any>(
            `${environment.fullBaseUrl}/invoices`, { headers: this.headers }
        )
    }

    create(data: any) {
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/invoices`,
            data, {headers: this.headers}
        )
    }

    print(data: any) {
        let _headers = new HttpHeaders()
            .set('content-type', '*/*')
            .set('Access-Control-Allow-Origin', '*')
            
        return this._http_client.post(
            `${environment.invoiceServe.baseUrl}/${environment.invoiceServe.doc_uuid}/${environment.invoiceServe.output}`,
            data, { responseType: 'blob', }
        )
    }

    update(data: any) {
        return this._http_client.post<any>(
            `${environment.fullBaseUrl}/invoices`,
            data,
            { headers: this.headers }
        )
    }

    add_or_update_lines(product: any){
        /*
        const element = this.invoiceObject.lines.find((item: any) => item.uuid === product.uuid)

        if ( Boolean(element) ) {
            this.invoiceObject.lines = this.invoiceObject.lines.filter((line: any) => line.uuid != product.uuid)            
            product.quantity = this.invoiceObject.lines.filter((item: any) => item.uuid === product.uuid).length + 1
            this.invoiceObject.lines.push( product )
        }else {
            this.invoiceObject.lines.push( product )
        }
        */
       
        this.invoiceObject.lines.push( product )
    }

    full_calculation(){
        let lines = this.invoiceObject.lines
        this.total_without_tax = lines.reduce((partialSum: any, line: any) => (partialSum + line.total_without_tax), 0 )
        this.total_tax = lines.reduce((partialSum: any, line: any) => (partialSum + line.total_tax), 0 )
        this.total = lines.reduce((partialSum: any, line: any) => (partialSum + line.total), 0 )

        this.total_received = this.invoiceObject.payment_lines.reduce((partialSum: any, line: any) => (partialSum + line.amount_received), 0 )
    }

    

    get_payment_methods() {
        return this._http_client.get<any>(
            `${environment.fullBaseUrl}/invoices/payment_methods`, { headers: this.headers }
        )
    }

    _print_after_create( invoice: any ){
        this.print(invoice)
        .subscribe(response => {
            const blob = new Blob([response], { type: 'application/pdf' });
            const blobUrl = URL.createObjectURL(blob);
            const shouldPrint = true; // Replace this with your condition

            if (shouldPrint) {
                const printWindow = window.open(blobUrl, '_blank');
                printWindow?.print();
                if (printWindow) {
                    printWindow.onafterprint = () => {
                        URL.revokeObjectURL(blobUrl);
                    };
                }
            } else {
                saveAs(blobUrl, `${invoice.sigla_doc}.pdf`);
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
