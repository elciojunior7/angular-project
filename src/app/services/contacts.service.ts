import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { CommonService } from './common.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService extends CommonService {

  apiPath = ""; //environment.apiUrl + "contacts";

  constructor(private http: HttpClient) {
    super();
  }

    create(item: Contact): Observable<Contact> {
      return this.http
      .post<Contact>(this.apiPath, JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }
  
    getById(id: number): Observable<Contact> {
      return this.http
        .get<Contact>(this.apiPath + '/' + id)
        .pipe(
          catchError(this.handleError),
          shareReplay(1),
        );
    }
  
    listByIdPerson(offset:string, limit:string, idPerson:number, name:string, cpf:string, startBirthDate:string, endBirthDate:string): Observable<Array<Contact>> {
      let params = new HttpParams()
        .set('offset', offset)
        .set('limit', limit)
        .set('name', name)
        .set('cpf', cpf)
        .set('startBirthDate', startBirthDate)
        .set('endBirthDate', endBirthDate);
  
      return this.http
        .get<Array<Contact>>(this.apiPath + '/people/' + idPerson, { params })
        .pipe(
          catchError(this.handleError),
          shareReplay(1),
      );
    }
  
    update(id: number, item: Contact): Observable<Contact> {
      return this.http
        .put<Contact>(this.apiPath + '/' + id, JSON.stringify(item), this.httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    }
  
    delete(id: number) {
      return this.http
        .delete<any>(this.apiPath + '/' + id)
        .pipe(
          catchError(this.handleError)
        );
    }

    deleteByIdPerson(idPerson: number) {
      return this.http
        .delete<any>(this.apiPath + '/people/' + idPerson)
        .pipe(
          catchError(this.handleError)
        );
    }
}
