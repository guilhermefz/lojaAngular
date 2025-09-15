import { Component, inject, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto-service';
import { ProdutoModel } from '../../models/produtoModel';
import { FormsModule } from '@angular/forms';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-produto-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './produto-component.html',
  styleUrl: './produto-component.css'
})
export class ProdutoComponent implements OnInit {

  private service = inject(ProdutoService);

  produtos: ProdutoModel[] = [];
  novoNome = '';
  novoPreco = '';
  novaDescricao = '';
  erro = '';
  ok = '';

  loading = false;
  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.loading = true;  //faz a inscrição para reagir ao resultado do Observable
    this.service.listar().subscribe({
      next: item => {
        this.produtos = item; this.loading = false;
      
      },
      error: e => {
        this.erro = e.message;
        this.loading = false;
      }
    })
  }

  adicionar() {
    this.erro = '';
    const precoNum = Number(this.novoPreco);
    const nome = this.novoNome.trim();
    if (!nome) {
      this.erro = 'Informe os valores do campo nome';
      return;
    }
    if (Number.isNaN(precoNum) || precoNum < 0) {
      this.erro = 'Informe os valores';
      return;
    }
    if (!this.novaDescricao.trim()) {
      this.erro = 'Informe uma descrição';
      return;
    }
    
    const payload : ProdutoModel={
      id : '',
      nome: this.novoNome,
      descricao: this.novaDescricao,
      preco: precoNum
    }

    this.loading = true;
    this.service.adicionar(payload).subscribe({
      next: (p) => {
        this.ok = `Produto ${p.nome} salvo com sucesso`;
        this.loading = false;
        this.novoNome = '';
        this.novaDescricao = '';
        this.novoPreco = '';
        this.carregar();
        
          setTimeout(() => this.ok = '', 3000);
      },
      error: (e) => {
        this.erro = e.message || 'falha ao salvar o produto';
        this.loading = false;
        setTimeout(() => this.erro = '', 3000);
      }
    })
  }

    remover(id: string){
      this.service.remover(id).subscribe({
        next: (msg: string) => {
          this.ok = msg || "Produto apagado";
          this.carregar();
          setTimeout(() => this.ok = '' ,3000);
        },
        error: e => {
          this.erro = e.message || "Deu ruim";
        }
      })
      
    }



}
