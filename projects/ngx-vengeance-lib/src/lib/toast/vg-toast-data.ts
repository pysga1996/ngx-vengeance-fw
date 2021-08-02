import {TemplateRef} from '@angular/core';

export class VgToastData {
  title?: string;
  text?: string;
  template?: TemplateRef<any>;
  templateContext?: Object | null;
}
