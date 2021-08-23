import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'vgCurrency'
})
export class VgCustomCurrencyPipe implements PipeTransform {

  currentLocale: string = 'vi-VN';

  constructor() {
    if (navigator.language) {
      this.changeLocale(navigator.language)
    }
  }

  changeLocale(locale: string) {
    this.currentLocale = locale;
  }

  transform(value: any, ...arg: any[]): string {
    if (arg[0] && arg[0] !== this.currentLocale) {
      this.changeLocale(arg[0]);
    }
    const strWithNoComma = value.toString().replace(/(,|\.)/g, '');
    const strDigitOnly = strWithNoComma.replace(/\D/g, '');
    if (Number(strDigitOnly)) {
      return Number(strDigitOnly).toLocaleString(this.currentLocale);
    } else {
      return strDigitOnly.replace(/\D/g, '');
    }
  }

}
