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
        filter_value: null,
        start_date: Date.now(),
        end_date: Date.now()
    }

    constructor() {
        
    }

    reset(){
        this.pagination = {
            page: 1,
            limit: 5,
            order_by: '-created_at',
            filter_column: null,
            filter_value: null,
            start_date: Date.now(),
            end_date: Date.now()
        }
    }

    startOfMonth(){
        const date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

        let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        let month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
        let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(firstDay);
        
        return `${year}-${month}-${day}`
    }

    currentOfMonth(){
        const date = new Date();

        let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        let month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
        let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        
        return `${year}-${month}-${day}`
    }



}
