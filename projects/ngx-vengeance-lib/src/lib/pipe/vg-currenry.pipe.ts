import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vgCurrency',
})
export class VgCustomCurrencyPipe implements PipeTransform {
  currentLocale = 'vi-VN';

  constructor() {
    if (navigator.language) {
      this.changeLocale(navigator.language);
    }
  }

  changeLocale(locale: string): void {
    this.currentLocale = locale;
  }

  // eslint-disable-next-line
  transform(value: any, ...arg: never[]): string {
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
