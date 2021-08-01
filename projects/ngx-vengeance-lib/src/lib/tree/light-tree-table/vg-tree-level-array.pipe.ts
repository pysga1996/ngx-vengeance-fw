import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'vgTreeLevel',
    pure: false,
})
export class VgTreeLevelArrayPipePipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        return new Array(value + 1);
    }

}
