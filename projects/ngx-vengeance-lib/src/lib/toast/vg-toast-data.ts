import { InjectionToken, TemplateRef } from '@angular/core';
import { ToastType } from './vg-toast.module';
import {TOAST_TYPE} from "./vg-toast.config";

export const TOAST_DATA = new InjectionToken<VgToastData>('TOAST_DATA');

export class VgToastData {
    text?: string;
    template?: TemplateRef<any>;
    templateContext?: Object | null;
}
