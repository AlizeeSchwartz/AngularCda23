import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isAdmin'
})
export class IsAdminPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
