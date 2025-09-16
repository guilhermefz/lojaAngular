import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LojaService } from '../services/loja-service';
import { LojaModel } from '../models/LojaModel';

@Component({
  selector: 'app-loja-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './loja-component.html',
  styleUrl: './loja-component.css'
})
export class LojaComponent implements OnInit {

  private service = inject(LojaService);

  lojas: LojaModel[] = [];
  novoNome = '';
  novocnpj = '';
  novoendereco = '';
  novotelefone = '';
  erro = '';
  ok = '';

  loading = false;
  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.loading = true;  //faz a inscrição para reagir ao resultado do Observable
    this.service.listar().subscribe({
      next: itens => {
        this.lojas = itens; this.loading = false;
      },
      error: er => {
        this.erro = er.message;
        this.loading = false;
      }
    })
  }

  adicionar() {
    this.erro = '';
    const nome = this.novoNome.trim();
    const cnpj = this.novocnpj.trim();
    const telefone = this.novotelefone.trim();
    const endereco = this.novoendereco.trim();

    if (!nome) {
      this.erro = 'Informe os valores do campo nome';
      return;
    }
    if (!cnpj) {
      this.erro = 'Informe o cnpj';
      return;
    }
    if (!telefone) {
      this.erro = 'Informe um telefone';
      return;
    }
    if (!endereco) {
      this.erro = 'Informe um endereco';
      return;
    }

    const payload : LojaModel={
      id : '',
      nome: nome,
      cnpj: cnpj,
      telefone: telefone,
      endereco: endereco
    }

    this.loading = true;
    this.service.adicionar(payload).subscribe({
      next: (p) => {
        this.ok = `Produto ${p.nome} salvo com sucesso`;
        this.loading = false;
        this.novoNome = '';
        this.novocnpj = '';
        this.novoendereco = '';
        this.novotelefone = '';
        this.carregar();
        
          setTimeout(() => this.ok = '', 3000);
      },
      error: (e) => {
        this.erro = e.message || 'falha ao salvar a loja';
        this.loading = false;
        setTimeout(() => this.erro = '', 3000);
      }
  })
}

remover(id: string){
  this.service.remover(id).subscribe({
    next: (msg: string) => {
      this.ok = msg || "Loja apagada";
      this.carregar();
      setTimeout(() => this.ok = '' ,3000);
    },
    error: e => {
      this.erro = e.message || "Deu ruim";
    }
  })
  
}
}
