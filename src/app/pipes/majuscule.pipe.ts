import { Pipe, PipeTransform } from '@angular/core';
import { utilisateur } from '../models/utilisateur';

@Pipe({
  name: 'majuscule'
})
export class MajusculePipe implements PipeTransform {

  transform(utilisateur: utilisateur, ...args: string[]): string {
    return utilisateur.firstname + ' ' + utilisateur.lastname.toUpperCase();
  }

}
