import { Injectable } from '@angular/core';
import { LojaModel } from '../models/LojaModel';

@Injectable({
  providedIn: 'root'
})
export class LojaService {
  private loja: LojaModel[] = [
    { id: 1, cnpj:'21212121', nome:'Galpao', endereco:'Balneario', telefone:'65463363'},
    { id: 2, cnpj:'54636363', nome:'Nuvem', endereco:'EUA', telefone:'65464444'},
    { id: 3, cnpj:'21298979', nome:'Centauro', endereco:'Xaxim', telefone:'3524235'},
    { id: 4, cnpj:'21345864', nome:'Riachuelo', endereco:'Chapeco', telefone:'532523'}
  ];
  private nextId = 5;

  listar(): LojaModel[]{
    return [...this.loja]
  }

  adicionar(nome: string, cnpj: string, endereco: string, telefone: string): LojaModel{
    const novo: LojaModel = {id: this.nextId++, cnpj, nome, endereco, telefone};
    this.loja.push(novo);
    return novo;
  }

  remover(id: number): void{
    this.loja = this.loja.filter(p => p.id !== id);
  }
}
