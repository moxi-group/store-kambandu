import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SalesService } from './sales.service';
import { saveAs } from 'file-saver';
import { ApplicationService } from 'src/app/api/application.service';
import { PrintsService } from 'src/app/services/prints.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
    selector: 'app-sales-boxes',
    templateUrl: './sales-boxes.component.html',
    styleUrls: ['./sales-boxes.component.scss']
})

export class SalesBoxesComponent implements OnInit {
    sale_box: any = {}
    loading: boolean = false

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
        public _filterService: FilterService,
        public _printService: PrintsService,
        private _applicationService: ApplicationService,
        public _salesService: SalesService,
        public translate: TranslateService
    ) { }

    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this._onTableDataChange( this._filterService.pagination )
    }

    _onTableDataChange(filterEmit: any): void{
        this.loading =  true
        this._salesService
        .get_seles_boxes(this._filterService.pagination)
        .subscribe(response => {
            this._salesService.sales_boxes = Object(response)
            this.loading = false
        })
    }

    _onTableDataChangePage(page: any){
        this._filterService.pagination.page = page
        this._onTableDataChange( this._filterService.pagination )
    }

    pachValue(item: any) {
        this.sale_box = item
    }

    _print(sale_box: any) {
        const company_data = sessionStorage.getItem('CURRENT_COMPANY_DATA')
        sale_box = Object.assign(sale_box, {company: company_data ? JSON.parse(company_data) : {}})
        let created_at = new Date(sale_box.created_at)

        sale_box.created_at = created_at.toISOString().split('T')[0]

        this._printService
        .cash_summaries( sale_box )
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
                saveAs(blobUrl, `resumo-de-caixa.pdf`);
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
