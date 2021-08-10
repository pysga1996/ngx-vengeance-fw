import {TemplateRef} from '@angular/core';

export interface TreeTableColumnConfig {
    title?: string;
    key: string;
    width?: string;
    type?: 'TEXT' | 'CHECKBOX' | 'CUSTOM';
    customClass?: string;
    templateRef: TemplateRef<any> | null;
    checkboxVerticalCascade?: boolean;
    checkboxHorizontalCascadedBy?: string;
}

export interface TreeTableConfig {
    columns: TreeTableColumnConfig[];
}
