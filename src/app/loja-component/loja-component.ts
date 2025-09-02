import { Component, inject } from '@angular/core';
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
export class LojaComponent {

  private service = inject(LojaService);

  lojas: LojaModel[]=[];
  novoNome = '';
  novocnpj= '';
  novoendereco ='';
  novotelefone = '';

  ngOnInit(){
    this.carregar();
  }

  carregar(){
    this.lojas = this.service.listar();
  }

  adicionar(){
    const nome= this.novoNome.trim();
    const cnpj=this.novocnpj.trim();
    const endereco=this.novoendereco.trim();
    const telefone=this.novotelefone.trim();
    if(!nome) return;
    this.service.adicionar(cnpj, nome, endereco, telefone);
    this.novoNome ='';
    this.novocnpj ='';
    this.novoendereco ='';
    this.novotelefone ='';
    this.carregar();
  }

    remover(id: number){
      this.service.remover(id);
      this.carregar();
    }
}
