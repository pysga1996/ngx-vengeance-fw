import { Injectable } from '@angular/core';

@Injectable()
export class VgErrorDictService {
  private messagePrefix = '';
  // eslint-disable-next-line
  private translateService!: any;
  private translateFuncName!: string;

  register(
    messagePrefix: string,
    // eslint-disable-next-line
    service: any,
    translateFuncName: string
  ): void {
    this.messagePrefix = messagePrefix;
    this.translateService = service;
    this.translateFuncName = translateFuncName;
  }

  // eslint-disable-next-line
  translate(key: string, label: string, argsObj: any): string {
    return (
      this.translateService[this.translateFuncName] as (
        key: string,
        options: { [key: string]: unknown }
      ) => string
    )(`${this.messagePrefix}${key}`, {
      label,
      ...argsObj,
    });
  }

  // private config!: { [key: string]: string };

  // constructor(private http: HttpClient) {
  // }

  // load() {
  //   return new Promise((resolve, reject) => {
  //     this.http.get<{ [key: string]: string }>('./assets/config/' + '.json')
  //     .subscribe((data) => {
  //         this.config = data;
  //         resolve(true);
  //       },
  //       (error: any) => {
  //         console.error(error);
  //         reject(error);
  //       });
  //   });
  // }

  // translate(key: string, ...args: string[]): string {
  //   const msg: string = this.config[key];
  //   if (msg) {
  //     return msg.replace(/{(\d+)}/g, function (match, number) {
  //       return typeof args[number] != 'undefined' ? args[number] : match;
  //     });
  //   }
  //   return '';
  // }
}
