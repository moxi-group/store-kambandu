import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'to_kwanza',
})

export class FormatCurrencyPipe implements PipeTransform {    
    transform( value: number = 0 ): string | null {
        return `${Number(value.toFixed(2)).toLocaleString()} AOA`
    }
}