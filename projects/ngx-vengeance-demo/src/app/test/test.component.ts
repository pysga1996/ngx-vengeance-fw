import { Component, OnInit } from '@angular/core';
import {VgToastData, VgToastService, TOAST_TYPE } from 'projects/ngx-vengeance-lib/src/public-api';
// import {VgToastData, VgToastService, TOAST_TYPE } from 'ngx-vengeance-lib';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private toastService: VgToastService) { }

  ngOnInit(): void {
    let count = 0;
    const loop = setInterval(() => {
      if (count === 5) {
        clearInterval(loop);
        return;
      }
      const data = new VgToastData();
      data.title = 'Test title';
      data.text = 'test vcl vcl vcl vclv vcvcvlcv vclvc dsd daljd fdj asdias dasijd asdkjnha asd vlcv cvlcv cvl ' + count;
      this.toastService.show(data, {type: TOAST_TYPE.ERROR, duration: 0});
      count++;
    }, 1000);
  }

}
