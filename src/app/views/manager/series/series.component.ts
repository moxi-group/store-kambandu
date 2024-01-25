import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SeriesService } from './series.service';

@Component({
    selector: 'app-series',
    templateUrl: './series.component.html',
    styleUrls: ['./series.component.scss']
})

export class SeriesComponent implements OnInit {
    serie: any = {}
    loading: boolean = false

    constructor(
        public _serieService: SeriesService,
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
       this.loading = true
       this._serieService
        .get_series()
        .subscribe(response => {
            this._serieService.series = Object(response)
            this.loading = false
      })
    }

    pachValue(item: any) {
        this.serie = item
    }



}
