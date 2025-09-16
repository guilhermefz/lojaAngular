import { Injectable, inject } from '@angular/core';
import { LojaModel } from '../models/LojaModel';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LojaService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/loja';
  
  private lojas: LojaModel[] = [];

  listar(): Observable<LojaModel[]>{
    return this.http.get<LojaModel[]>(`${this.baseUrl}/listar`).pipe(catchError(this.handle));
  }

  adicionar(produto: LojaModel): Observable<LojaModel>{
    return this.http.post<LojaModel>(`${this.baseUrl}/salvar`, produto).pipe(catchError(this.handle));
  }
  
  remover(id: string): Observable<string>{
    return this.http.post(`${this.baseUrl}/apagar/${id}`, null,
    {responseType: 'text'}).pipe(catchError(this.handle));
  }
  
  private handle(err: HttpErrorResponse){
    const msg = err.error?.message || err.error?.erro || err.message || 'Erro Inesperado';
    return throwError(() => new Error(msg));
  }
}
