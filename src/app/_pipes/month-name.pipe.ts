import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthName',
  standalone: true
})
export class MonthNamePipe implements PipeTransform {

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  transform(value: number, ...args: unknown[]): unknown {
    if (value === null || value === undefined) {
      return '';
    }
    return this.months[value];
  }

}
