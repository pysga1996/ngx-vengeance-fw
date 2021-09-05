import { Observable } from 'rxjs';

export interface PingServiceMap {
  [serviceName: string]: {
    url: string;
    status?: 'loading' | 'success' | 'failed';
    obs?: Observable<boolean>;
  };
}

export interface VgPingServiceDisplay {
  [priority: string]: PingServiceMap;
}
