import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vgPipeWrapper',
  pure: false,
})
export class VgPipeWrapperPipe implements PipeTransform {
  // eslint-disable-next-line
  transform(value: any, ...args: any[]): string {
    // eslint-disable-next-line
    const convertFunc = args[0] ?? ((val: any) => val);
    return convertFunc(value);
  }
}
