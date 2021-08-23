import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {
  VgControlModule,
  VgDirectivesModule,
  VgErrorDictService,
  VgPipeModule,
  VgToastModule,
  VgTreeTableModule,
} from 'projects/ngx-vengeance-lib/src/public-api';
// import { VgToastModule, VgControlModule, VgTreeTableModule } from 'ngx-vengeance-lib';
import {TestModule} from "./test/test.module";
import {TreeLevelArrayPipe} from "./high-performance-tree-table/tree-level-array.pipe";
import {HighPerformanceTreeTableComponent} from "./high-performance-tree-table/high-performance-tree-table.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {VgLoaderModule} from "../../../ngx-vengeance-lib/src/lib/loading/vg-loader.module";

// loader module
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `./assets/i18n/`, '.json');
}

@NgModule({
  declarations: [
    AppComponent, TreeLevelArrayPipe, HighPerformanceTreeTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    VgControlModule,
    VgTreeTableModule,
    VgToastModule,
    TestModule,
    VgDirectivesModule,
    VgPipeModule,
    VgLoaderModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        },
        defaultLanguage: 'vi'
      }
    ),
    VgControlModule.forRoot({
      provide: VgErrorDictService,
      useFactory: (translateService: TranslateService) => {
        const vgErrorDictService: VgErrorDictService = new VgErrorDictService();
        vgErrorDictService.register('validation.message.', translateService, 'instant');
        return vgErrorDictService;
      },
      deps: [TranslateService]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
