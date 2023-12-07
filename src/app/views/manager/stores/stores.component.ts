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

    constructor(
        public _storeService: StoresService,
        public translate: TranslateService
    ) {
        
    }

    ngOnInit(): void {
        this.loading_data()
    }

    loading_data() {
        this.get_stores();
    }

    get_stores() {
        this._storeService
        .get_stores()
        .subscribe(response => {
            this._storeService.stores = Object(response)
        })
    }

    pachValue(item: any) {
        this.store = item
    }


}
