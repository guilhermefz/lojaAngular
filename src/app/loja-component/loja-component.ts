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

  lojas: LojaModel[]=[];
  novoNome = '';
  novocnpj= '';
  novoendereco ='';
  novotelefone = '';
  erro = '';

  loading = false;
  ngOnInit(){
    this.carregar();
  }

  carregar(){
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

  // adicionar(){
  //   const nome= this.novoNome.trim();
  //   const cnpj=this.novocnpj.trim();
  //   const endereco=this.novoendereco.trim();
  //   const telefone=this.novotelefone.trim();
  //   if(!nome) return;
  //   this.service.adicionar(cnpj, nome, endereco, telefone);
  //   this.novoNome ='';
  //   this.novocnpj ='';
  //   this.novoendereco ='';
  //   this.novotelefone ='';
  //   this.carregar();
  // }

  //   remover(id: number){
  //     this.service.remover(id);
  //     this.carregar();
  //   }
}
