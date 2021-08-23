import { TemplateRef } from '@angular/core';

export interface VgTreeTableColumnConfig {
  title?: string;
  key: string;
  width?: string;
  type?: 'TEXT' | 'CHECKBOX' | 'CUSTOM';
  customClass?: string;
  templateRef?: TemplateRef<never>;
  checkboxVerticalCascade?: boolean;
  checkboxHorizontalCascade?: { key: string; disabled: boolean }[];
  checkboxDisabled?: boolean;
}

export interface VgTreeTableConfig {
  columns: VgTreeTableColumnConfig[];
}
