import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TaxesService } from './taxes.service';

@Component({
    selector: 'app-taxes',
    templateUrl: './taxes.component.html',
    styleUrls: ['./taxes.component.scss']
})
export class TaxesComponent implements OnInit {
    tax: any = {}
    taxes: any = []

    constructor(
        private _taxService: TaxesService,
        public translate: TranslateService
    ) { }

    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this.get_users();
    }

    get_users() {
        this._taxService
        .get_taxes()
        .subscribe(response => {
            this.taxes = Object(response)
        })
    }

    pachValue(item: any) {
        this.tax = item
    }



}
