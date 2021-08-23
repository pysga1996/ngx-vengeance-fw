import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vgTreeLevel',
  pure: false,
})
export class VgTreeLevelArrayPipePipe implements PipeTransform {
  // eslint-disable-next-line
  transform(value: number): any[] {
    return new Array(value + 1);
  }
}
