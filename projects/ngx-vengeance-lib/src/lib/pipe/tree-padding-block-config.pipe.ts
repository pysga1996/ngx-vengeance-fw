import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'vgTreeTableBlockConfig',
  pure: false,
})
export class TreePaddingBlockConfigPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return {...value, [args[0]]: ( args[1] < args[2])};
  }

}
