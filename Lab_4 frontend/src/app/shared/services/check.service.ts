import {Injectable} from '@angular/core';
import {EToken, Point, User} from './interfaces';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class CheckService {
  constructor(private http: HttpClient) {
    }
  check(point: Point): Observable<any> {
    return this.http.post('/rest/main/getPoints', point);
  }
  getPoints(etoken: EToken): Observable<any>{
    return this.http.post('/rest/main/getPointsArray', etoken);
  }
}
