import {Pipe, PipeTransform} from "@angular/core";
import {VgErrorDictService} from "./vg-error-dict.service";

@Pipe({
  name: 'vgError',
  pure: false
})
export class VgErrorMessagePipe implements PipeTransform {

  constructor(private vgErrorDictService: VgErrorDictService) {
  }

  transform(value: string, ...args: any[]): any {
    return this.vgErrorDictService.translate(value, args[0], args[1]);
  }

}
