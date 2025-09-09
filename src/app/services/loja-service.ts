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

  // adicionar(nome: string, cnpj: string, endereco: string, telefone: string): LojaModel{
  //   const novo: LojaModel = {id: this.nextId++, cnpj, nome, endereco, telefone};
  //   this.loja.push(novo);
  //   return novo;
  // }

  // remover(id: number): void{
  //   this.loja = this.loja.filter(p => p.id !== id);
  // }
  private handle(err: HttpErrorResponse){
    const msg = err.error?.message || err.error?.erro || err.message || 'Erro Inesperado';
    return throwError(() => new Error(msg));
  }
}
