import { Component, OnInit } from '@angular/core';
import { VgToastService } from 'ngx-vengeance-lib';
import {VgDialogData, VgDialogService} from "ngx-vengeance-lib";
// import {
//   VgToastData,
//   VgToastService,
//   TOAST_TYPE,
//   VgDialogData, VgDialogService
// } from 'projects/ngx-vengeance-lib/src/public-api';
// import {VgToastData, VgToastService, TOAST_TYPE } from 'ngx-vengeance-lib';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private toastService: VgToastService, private dialogService: VgDialogService) { }

  ngOnInit(): void {

  }

  showToastDemo() {
    // let count = 0;
    // const loop = setInterval(() => {
    //   if (count === 5) {
    //     clearInterval(loop);
    //     return;
    //   }
    //   const data = new VgToastData();
    //   data.title = 'Test title';
    //   data.text = 'test vcl vcl vcl vclv vcvcvlcv vclvc dsd daljd fdj asdias dasijd asdkjnha asd vlcv cvlcv cvl ';
    //   this.toastService.show(data, {type: TOAST_TYPE.ERROR, duration: 3000});
    //   count++;
    // }, 1000);
  }

  showDialogDemo(): void {
    let count = 0;
    const mapType: any = {
      '0': 'showSuccessMessage',
      '1': 'showErrorMessage',
      '2': 'showWarningMessage',
      '3': 'showInfoMessage',
      '4': 'showMessage',
    }
    const loop = setInterval(() => {
      if (count === 5) {
        clearInterval(loop);
        return;
      }
      const data: VgDialogData = {
        title: 'Test title',
        message: 'test vcl vcl vcl vclv vcvcvlcv vclvc dsd daljd fdj asdias dasijd asdkjnha asd vlcv cvlcv cvl '
      };
      // @ts-ignore
      this.dialogService[mapType[`${count}`]]();
      count++;
    }, 3000);
  }

  showDialog(name: string) {
    // @ts-ignore
    this.dialogService[name]();
  }

}
