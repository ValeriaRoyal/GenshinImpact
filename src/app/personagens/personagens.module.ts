import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CadastroPersonagensComponent } from './cadastro-personagens/cadastro-personagens.component';
import { MaterialModule } from '../shared/material/material.module';
import { ListagemFilmesComponent } from './listagem-personagens/listagem-personagens.component';
import { CamposModule } from '../shared/components/campos/campos.module';
import { VisualizarFilmesComponent } from './visualizar-personagens/visualizar-personagens.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CamposModule,
    InfiniteScrollModule
  ],
  declarations: [CadastroPersonagensComponent, ListagemFilmesComponent, VisualizarFilmesComponent]
})
export class FilmesModule { }
