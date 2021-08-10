import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'treeLevelArr',
    pure: false,
})
export class TreeLevelArrayPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        return new Array(value + 1);
    }

}
