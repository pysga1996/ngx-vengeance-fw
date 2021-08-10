import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'vgCustomCurrency'
})
export class VgCustomCurrencyPipe implements PipeTransform {

  transform(value: any): string {
    const strWithNoComma = value.toString().replace(/(,|\.)/g, '');
    const strDigitOnly = strWithNoComma.replace(/\D/g, '');
    if (Number(strDigitOnly)) {
      return Number(strDigitOnly).toLocaleString();
    } else {
      return strDigitOnly.replace(/\D/g, '');
    }
  }

}
