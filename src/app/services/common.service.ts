import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class CommonService {

  handleError(error: HttpErrorResponse) {
    let status!: number;
    let msg!: string;
    // if (error.error instanceof ErrorEvent) {
    //   console.error('An error occurred:', error.error.message);
    // } else {
      status = error.status;
      msg = error.error && error.error.msg ? error.error.msg : 'Algo de errado aconteceu. Por favor, tente novamente.';
      console.error(
        `API Http Code response ${error.status}, ` +
        `Response body: ${error.error}`);
    // }

    return throwError({status:status, message:msg});
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

}
