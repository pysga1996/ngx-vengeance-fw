export type FileType =
  | 'audio'
  | 'video'
  | 'image'
  | 'pdf'
  | 'word'
  | 'excel'
  | 'powerpoint'
  | 'text'
  | 'archive'
  | 'code'
  | 'binary'
  | 'generic';

export class VgFileUtil {
  public static getFileType(file: File | Blob | null): FileType {
    switch (file?.type) {
      case 'audio/mpeg':
      case 'audio/x-m4a':
      case 'audio/flag':
      case 'audio/wave':
        return 'audio';
      case 'video/mp4':
      case 'video/x-matroska':
        return 'video';
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
        return 'image';
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'word';
      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return 'excel';
      case 'application/pdf':
        return 'pdf';
      case 'text/plain':
        return 'text';
      case 'application/x-zip-compressed':
      case '':
        return 'archive';
      case 'application/json':
      case 'text/xml':
        return 'code';
      case 'application/x-msdownload':
        return 'binary';
      default:
        return 'generic';
    }
  }
}
