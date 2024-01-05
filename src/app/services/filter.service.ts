import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class FilterService {

    pagination: any = {
        page: 1,
        limit: 5,
        order_by: '-created_at',
        filter_column: null,
        filter_value: null
    }

    constructor() {
        
    }

    reset(){
        this.pagination = {
            page: 1,
            limit: 5,
            order_by: '-created_at',
            filter_column: null,
            filter_value: null
        }
    }


}
