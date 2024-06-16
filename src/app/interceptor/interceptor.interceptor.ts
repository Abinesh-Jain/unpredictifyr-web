import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError((err: any) => {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        console.log(401);
      } else {

      }
    } else {

    }
    console.error(err);
    return throwError(() => err);
  }));
};
