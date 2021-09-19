import { Component, OnDestroy, OnInit } from '@angular/core';
import { VgIdleTimer } from '../../../ngx-vengeance-lib/src/lib/util/vg-idle-timer';

@Component({
  selector: 'vg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  timer!: VgIdleTimer;

  ngOnInit(): void {
    // this.timer = new VgIdleTimer(30, () => {
    //   alert('Time out!');
    // });
  }

  ngOnDestroy(): void {
    this.timer.cleanUp();
  }

  title = 'ngx-vengeance-demo';
  endpointMap = {
    ['0']: {
      'chi-discovery-service': {
        url: `http://localhost:8010/`,
      },
    },
    ['1']: {
      'phi-config-service': {
        url: `http://localhost:8030/`,
      },
    },
    ['2']: {
      'lambda-auth-service': {
        url: `https://localhost:8082/lambda-auth/`,
      },
    },
    ['3']: {
      'alpha-sound-service': {
        url: `https://localhost:8086/alpha-sound/`,
      },
    },
  };
  // endpointMap = {
  //   ['0']: {
  //     'chi-discovery-service': {
  //       url: `https://${window.location.hostname}/service/chi-discovery/`,
  //     },
  //   },
  //   ['1']: {
  //     'phi-config-service': {
  //       url: `https://${window.location.hostname}/service/phi-config/`,
  //     },
  //   },
  //   ['2']: {
  //     'lambda-auth-service': {
  //       url: `https://${window.location.hostname}/service/lambda-auth/`,
  //     },
  //   },
  //   ['3']: {
  //     'alpha-sound-service': {
  //       url: `https://${window.location.hostname}/service/alpha-sound/`,
  //     },
  //   },
  // };
}
