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
    series: any = []

    constructor(
        private _serieService: SeriesService,
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
        this._serieService
        .get_series()
        .subscribe(response => {
            this.series = Object(response)
        })
    }

    pachValue(item: any) {
        this.serie = item
    }



}
