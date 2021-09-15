import { Component, OnInit } from '@angular/core';
// import {TOAST_TYPE, VgToastData, VgToastService, VgDialogData, VgDialogService} from 'ngx-vengeance-lib';
import {
  VgDialogData,
  VgDialogService,
  VgLoaderService,
  VgToastData,
  VgToastService,
} from 'projects/ngx-vengeance-lib/src/public-api';

// import {VgToastData, VgToastService, TOAST_TYPE } from 'ngx-vengeance-lib';

@Component({
  selector: 'vg-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  mapType: { [key: string]: string } = {
    '0': 'success',
    '1': 'error',
    '2': 'warning',
    '3': 'info',
    '4': 'show',
  };
  counter = 0;
  // es = new EventSource('https://localhost:8095/delta-notification/lol/news');

  constructor(
    private toastService: VgToastService,
    private dialogService: VgDialogService,
    private loaderService: VgLoaderService
  ) {}

  ngOnInit(): void {
    // this.es.onopen = (event) => {
    //   console.log(`Opened: `, event);
    // };
    // this.es.onmessage = (event) => {
    //   console.log(`Message: `, event);
    // };
    // this.es.onerror = (event) => {
    //   console.log(`Error: `, event);
    // };
  }

  shutdownSse(): void {
    // this.es.close();
  }

  showDialogDemo(): void {
    let count = 0;
    const loop = setInterval(() => {
      if (count === 5) {
        clearInterval(loop);
        return;
      }
      const data: VgDialogData = {
        title: 'Test title',
        message:
          'test vcl vcl vcl vclv vcvcvlcv vclvc dsd daljd fdj asdias dasijd asdkjnha asd vlcv cvlcv cvl ',
      };
      (
        this.toastService[(this.mapType as never)[`${count}`]] as (
          data: VgToastData
        ) => void
      )(data);
      count++;
    }, 3000);
  }

  showToastDemo(): void {
    let count = 0;
    const loop = setInterval(() => {
      if (count === 5) {
        clearInterval(loop);
        return;
      }
      const data: VgToastData = {
        title: 'Test title',
        text: `test vcl vcl vcl vclv vcvcvlcv vclvc dsd daljd fdj asdias dasijd asdkjnha asd vlcv cvlcv cvl ${count}`,
      };
      (
        this.toastService[(this.mapType as never)[`${count}`]] as (
          data: VgToastData
        ) => void
      )(data);
      count++;
    }, 1500);
  }

  showDialog(name: string): void {
    (this.dialogService[name as never] as () => void)();
  }

  showToast(name: string): void {
    const data: VgToastData = {
      title: 'Test title',
      text: `test vcl vcl vcl vclv vcvcvlcv vclvc dsd daljd fdj asdias dasijd asdkjnha asd vlcv cvlcv cvl ${++this
        .counter}`,
    };
    ((this.toastService as never)[name] as (data: VgToastData) => void)(data);
  }

  loading(value: boolean): void {
    this.loaderService.loading(value);
  }
}
