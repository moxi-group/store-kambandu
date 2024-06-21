import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationService } from 'src/app/api/application.service';
import { FilterService } from 'src/app/services/filter.service';
import { PrintsService } from 'src/app/services/prints.service';
import { saveAs } from 'file-saver';
import { ReceiptsService } from './receipts.service';

@Component({
    selector: 'app-receipts',
    templateUrl: './receipts.component.html',
    styleUrls: ['./receipts.component.scss']
})

export class ReceiptsComponent implements OnInit {
    loading: boolean = false
    receipts: any = []
    receipt: any = {}

    filter_options: any = [
        {
            value: 'is_closed',
            description: 'Estado Aberto'
        },
        {
            value: '-is_closed',
            description: 'Estado Fechado'
        }
    ]

    constructor(
        public translate: TranslateService,
        public _filterService: FilterService,
        public _printService: PrintsService,
        private _receiptService: ReceiptsService,
        private _applicationService: ApplicationService,

    ) {

    }

    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this._onTableDataChange( this._filterService.pagination )
    }

    _onTableDataChange(filterEmit: any): void{
        this.loading = true
        this._filterService.pagination = filterEmit

        this._receiptService
        .get_receipts( this._filterService.pagination )
        .subscribe(response => {
            this.receipts = Object(response)
            this.loading = false
        })
    }

    _onTableDataChangePage(page: any){
        this._filterService.pagination.page = page
        this._onTableDataChange( this._filterService.pagination )
    }



    _print(receipt: any) {
        const company_data = sessionStorage.getItem('CURRENT_COMPANY_DATA')
        receipt = Object.assign(receipt, {company: company_data ? JSON.parse(company_data) : {}})
        
        let created_at = new Date(receipt.created_at)
        receipt.created_at = created_at.toISOString().split('T')[0]

        this._receiptService
        .print(receipt)
        .subscribe(response => {
            const blob = new Blob([response], { type: 'application/pdf' });
            const blobUrl = URL.createObjectURL(blob);
            const shouldPrint = true;

            if (shouldPrint) {
                const printWindow = window.open(blobUrl, '_blank');
                printWindow?.print();
                if (printWindow) {
                    printWindow.onafterprint = () => {
                        URL.revokeObjectURL(blobUrl);
                    };
                }
            } else {
                saveAs(blobUrl, `${receipt.sigla_doc}.pdf`);
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
        this.receipt = item
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
