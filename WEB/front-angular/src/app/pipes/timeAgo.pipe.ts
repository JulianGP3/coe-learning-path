import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow, parseISO } from 'date-fns';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date): string {
    const date = typeof value === 'string' ? parseISO(value) : value;
    return formatDistanceToNow(date, { addSuffix: true });
  }
}
