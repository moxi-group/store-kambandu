import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SalesService } from './sales.service';

@Component({
    selector: 'app-sales-boxes',
    templateUrl: './sales-boxes.component.html',
    styleUrls: ['./sales-boxes.component.scss']
})

export class SalesBoxesComponent implements OnInit {
    sale_box: any = {}

    constructor(
        public _salesService: SalesService,
        public translate: TranslateService
    ) { }

    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this.get_sales()
    }


    get_sales() {
        this._salesService
        .get_seles_boxes()
        .subscribe(response => {
            this._salesService.sales_boxes = Object(response)
        })
    }

    pachValue(item: any) {
        this.sale_box = item
    }

}
