import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmesModule } from './personagens/personagens.module';
import { CadastroPersonagensComponent } from './personagens/cadastro-personagens/cadastro-personagens.component';
import { ListagemPersonagensComponent } from './personagens/listagem-personagens/listagem-personagens.component';
import { VisualizarPersonagensComponent } from './personagens/visualizar-personagens/visualizar-personagens.component';

const routes: Routes = [

  {
      path: '',
      redirectTo: 'personagens',
      pathMatch: 'full'
  },
  {
    path: 'personagens',
    children: [
      {
        path: '',
        component: ListagemPersonagensComponent
      },
      {
        path: 'cadastro',
        children: [
          {
            path: '',
            component: CadastroPersonagensComponent
          },
          {
            path: ':id',
            component: CadastroPersonagensComponent
          }
        ]
      },
      {
        path: ':id',
        component: VisualizarPersonagensComponent,
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: 'personagens' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FilmesModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
