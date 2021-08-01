import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VgToastComponent } from './vg-toast.component';
import { defaultToastConfig, TOAST_CONF } from './vg-toast.config';

export type ToastType = 'warning' | 'info' | 'success' | 'error';
@NgModule({
    declarations: [VgToastComponent],
    imports: [
        CommonModule
    ],
    exports: [VgToastComponent]
})
export class VgToastModule {
    public static forRoot(config = defaultToastConfig): ModuleWithProviders<any> {
        return {
            ngModule: VgToastModule,
            providers: [
                {
                    provide: TOAST_CONF,
                    useValue: { ...defaultToastConfig, ...config },
                },
            ],
        };
    }
}

