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

  // adicionar(nome: string): ProdutoModel{
  // }

  // remover(id: number): void{
    
  // }

  private handle(err: HttpErrorResponse){
    const msg = err.error?.message || err.error?.erro || err.message || 'Erro Inesperado';
    return throwError(() => new Error(msg));
  }
}
