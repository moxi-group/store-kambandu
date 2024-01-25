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
    loading: boolean = false

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
        this.loading = true
        this._saftService
        .get_safts()
        .subscribe(response => {
            this._saftService.safts = Object(response)
            this.loading = false
        })
    }

    _download(item: any) {
        this._saftService
        .download(item.uuid)
        .subscribe((response: Blob) => saveAs(response, item.name))
    }

}
