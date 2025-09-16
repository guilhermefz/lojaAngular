import { Injectable, inject } from '@angular/core';
import { ProdutoModel } from '../models/produtoModel';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/produtos';

  private produtos: ProdutoModel[] = [];

  listar(): Observable<ProdutoModel[]> {
    return this.http.get<ProdutoModel[]>(`${this.baseUrl}/listar`).pipe(catchError(this.handle));
  }

  adicionar(produto: ProdutoModel): Observable<ProdutoModel>{
    return this.http.post<ProdutoModel>(`${this.baseUrl}/salvar`, produto).pipe(catchError(this.handle));
  }

  remover(id: string): Observable<string>{
    return this.http.post(`${this.baseUrl}/apagar/${id}`, null,
    {responseType: 'text'}).pipe(catchError(this.handle));
  }

  editar(id: string, produto: ProdutoModel): Observable<ProdutoModel>{
    return this.http.post<ProdutoModel>(`${this.baseUrl}/editar/${id}`, produto)
    .pipe(catchError(this.handle));
  }

  private handle(err: HttpErrorResponse){
    const msg = err.error?.message || err.error?.erro || err.message || 'Erro Inesperado';
    return throwError(() => new Error(msg));
  }
}
