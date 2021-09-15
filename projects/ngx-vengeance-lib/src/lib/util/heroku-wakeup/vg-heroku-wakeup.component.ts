import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  VgPingServiceDisplay,
  PingServiceMap,
} from './vg-ping-service.display';
import { catchError, delay, map } from 'rxjs/operators';

@Component({
  selector: 'vg-heroku-wakeup',
  templateUrl: './vg-heroku-wakeup.component.html',
  styleUrls: ['./vg-heroku-wakeup.component.scss'],
})
export class VgHerokuWakeupComponent implements OnInit {
  @Input() configList: VgPingServiceDisplay = {};
  @Input() delayRetry = 10000;
  @Input() maxRetries = 3;
  @Input() templateRef!: TemplateRef<any>;
  pingSuccess!: boolean;

  constructor(private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    let successCount = 0;
    try {
      let retries = 0;
      let i = 0;
      while (i < Object.keys(this.configList).length) {
        const isSuccess = await this.processLevel(this.configList[`${i}`]);
        if (isSuccess) {
          i++;
          successCount++;
        } else if (retries >= this.maxRetries) {
          i++;
          retries = 0;
        } else {
          retries++;
          await of().pipe(delay(this.delayRetry)).toPromise();
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      if (successCount === Object.keys(this.configList).length) {
        this.pingSuccess = true;
      }
    }
  }

  async processLevel(serviceConfig: PingServiceMap): Promise<boolean> {
    try {
      const obsMap: { [key: string]: Observable<boolean> } = {};
      Object.keys(serviceConfig).forEach((key) => {
        obsMap[key] = this.http
          .head<void>(serviceConfig[key].url + 'ping')
          .pipe(
            map(() => {
              serviceConfig[key].status = 'success';
              return true;
            }),
            catchError((e) => {
              console.error(e);
              serviceConfig[key].status = 'failed';
              return of(false);
            })
          );
        serviceConfig[key].status = 'loading';
        serviceConfig[key].obs = obsMap[key];
      });
      const result = await forkJoin(obsMap).toPromise();
      console.log(result);
      return Object.keys(serviceConfig)
        .map((key) => serviceConfig[key].status)
        .every((status) => status === 'success');
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
