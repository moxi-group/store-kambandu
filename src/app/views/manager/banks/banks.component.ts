import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BanksService } from './banks.service';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss']
})
export class BanksComponent implements OnInit {
    bank: any = {}
    banks: any = []

    constructor(
        private _bankService: BanksService,
        public translate: TranslateService
    ) { }

    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this.get_series();
    }

    get_series() {
        this._bankService
        .get_banks()
        .subscribe(response => {
            this.banks = Object(response)
        })
    }

    pachValue(item: any) {
        this.bank = item
    }

}
