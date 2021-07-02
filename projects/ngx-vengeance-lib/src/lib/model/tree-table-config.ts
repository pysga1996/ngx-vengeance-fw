import {TemplateRef} from "@angular/core";

export interface TreeTableColumnConfig {
  title?: string;
  key: string;
  width?: string;
  type?: 'TEXT' | 'CHECKBOX' | 'CUSTOM';
  customClass?: string;
  templateRef?: TemplateRef<any>;
  checkboxVerticalCascade?: boolean;
  checkboxHorizontalCascade?: { key: string; disabled: boolean; }[];
  checkboxDisabled?: boolean;
}

export interface TreeTableConfig {
  columns: TreeTableColumnConfig[];
}
