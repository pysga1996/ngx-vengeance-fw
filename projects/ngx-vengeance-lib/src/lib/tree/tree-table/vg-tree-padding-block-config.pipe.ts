import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vgTreeTableBlock',
  pure: false,
})
export class VgTreeTableBlockConfigPipe implements PipeTransform {
  // eslint-disable-next-line
  transform(value: any, ...args: any[]): any {
    return { ...value, [args[0]]: args[1] < args[2] };
  }
}
