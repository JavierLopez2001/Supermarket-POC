import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/prodcut.model';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrl = 'http://localhost:3000/products';
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient, private snackBar: SnackbarService) { }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(products => {
        this.productsSubject.next(products);
      })
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      tap(() => {
        this.getAll().subscribe(products => {
          this.productsSubject.next(products);
        });
      })
    );
  }

  editProduct(id: number, productData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, productData).pipe(
      tap(() => {
        this.getAll().subscribe(products => {
          this.productsSubject.next(products);
        });
      })
    );
 }

  delete(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.getAll().subscribe(products => {
          this.productsSubject.next(products);
        });
      })
    );
  }
}
