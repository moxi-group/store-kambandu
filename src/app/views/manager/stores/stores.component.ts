import { Component, OnInit } from '@angular/core';
import { StoresService } from './stores.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-stores',
    templateUrl: './stores.component.html',
    styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {

    store: any = {}
    stores: any = []

    constructor(
        private _storeService: StoresService,
        public translate: TranslateService
    ) {
        
    }

    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this.get_series();
    }

    get_series() {
        this._storeService
        .get_series()
        .subscribe(response => {
            this.stores = Object(response)
        })
    }

    pachValue(item: any) {
        this.store = item
    }


}
