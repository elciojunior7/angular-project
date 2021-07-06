import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person';
import { CommonService } from './common.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeopleService extends CommonService {

  apiPath = environment.apiUrl + "/people";

  constructor(private http: HttpClient) {
    super();
  }

  create(item: Person): Observable<Person> {
  return this.http
    .post<Person>(this.apiPath, JSON.stringify(item), this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<Person> {
    return this.http
      .get<Person>(this.apiPath + '/' + id)
      .pipe(
        catchError(this.handleError),
        shareReplay(1),
      );
  }

  list(offset:string, limit:string, name:string, cpf:string): Observable<any> {
    let params = new HttpParams()
      .set('offset', offset)
      .set('limit', limit)
      .set('name', name)
      .set('cpf', cpf);

    return this.http
      .get<any>(this.apiPath, { params })
      .pipe(
        catchError(this.handleError),
        shareReplay(1),
      );
  }

  update(item: Person): Observable<Person> {
    return this.http
      .put<any>(this.apiPath, JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(id: number) {
    return this.http
      .delete<any>(this.apiPath + '/' + id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
