import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VgScrollerService {
  constructor(private http: HttpClient) {}

  getRandomFact(): Observable<any[]> {
    const month = Math.floor(Math.random() * 11) + 1;
    let maxDay = 30;
    if (month === 2) {
      maxDay = 27;
    } else if ([4, 6, 9, 11].includes(month)) {
      maxDay = 29;
    }
    const day = Math.floor(Math.random() * maxDay) + 1;
    return this.http.get<any[]>(
      `http://numbersapi.com/${month}/${day}/date?json`
    );
  }

  // http://localhost:3000/us-counties?_limit=20&_page=1
}
