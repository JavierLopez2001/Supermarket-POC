import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

 constructor(private snackBar: SnackbarService) {}

 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          if (req.url.includes('/products') && req.method === 'POST') {
            this.snackBar.showSnackBar('Producto añadido exitosamente');
          } else if (req.url.includes('/products') && req.method === 'PUT') {
            this.snackBar.showSnackBar('Producto modificado exitosamente');
          } else if (req.url.includes('/products') && req.method === 'DELETE') {
            this.snackBar.showSnackBar('Producto eliminado exitosamente');
          }
        }
      })
    );
 }
}
