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
    loading: boolean =  false

    constructor(
        public _bankService: BanksService,
        public translate: TranslateService
    ) { }

    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this.get_banks();
    }

    get_banks() {
        this.loading =  true
        this._bankService
        .get_banks()
        .subscribe(response => {
            this._bankService.banks = Object(response)
            this.loading =  false
        })
    }

    pachValue(item: any) {
        this.bank = item
    }

}
