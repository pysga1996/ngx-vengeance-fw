import { Pipe, PipeTransform } from '@angular/core';
import { FileType } from '../../util/vg-file-util';

@Pipe({
  name: 'vgFileIcon',
})
export class VgFileIconPipe implements PipeTransform {
  static FILE_TYPE_ICON_MAP: { [key in FileType]: string } = {
    audio: 'bi bi-file-earmark-music',
    video: 'bi bi-file-earmark-play',
    image: 'bi bi-file-earmark-image',
    pdf: 'bi bi-file-earmark-pdf',
    word: 'bi bi-file-earmark-word',
    excel: 'bi bi-file-earmark-spreadsheet',
    powerpoint: 'bi bi-file-earmark-ppt',
    text: 'bi bi-file-earmark-text',
    code: 'bi bi-file-earmark-code',
    binary: 'bi bi-file-earmark-binary',
    generic: 'bi bi-file-earmark',
  };

  transform(value: FileType): unknown {
    return VgFileIconPipe.FILE_TYPE_ICON_MAP[value] ?? '';
  }
}
