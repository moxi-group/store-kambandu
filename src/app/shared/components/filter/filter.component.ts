import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterService } from 'src/app/services/filter.service';

@Component({
    selector: 'Filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})

export class FilterComponent implements OnInit {
    @Input() options: any
    @Output() filterEmitter = new EventEmitter<any>()

    constructor(
        public _filterService: FilterService
    ) {
        this._filterService.reset()
    }

    ngOnInit(): void {
    }

    _onTableDataChange(event: any): any {
        this._filterService.pagination.page = Number.isInteger(event) ? event : 1 
        this.filterEmitter.emit(this._filterService.pagination)
    }

}
