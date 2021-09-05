import { Component } from '@angular/core';

@Component({
  selector: 'vg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngx-vengeance-demo';
  endpointMap = {
    ['0']: {
      'chi-discovery-service': {
        url: 'https://chi-discovery-service.herokuapp.com/',
      },
    },
    ['1']: {
      'phi-config-service': {
        url: 'https://phi-config-service.herokuapp.com/',
      },
    },
    ['2']: {
      'lambda-auth-service': {
        url: 'https://lambda-auth-service.herokuapp.com/',
      },
      'alpha-sound-service': {
        url: 'https://alpha-sound-service.herokuapp.com/',
      },
    },
  };
}
