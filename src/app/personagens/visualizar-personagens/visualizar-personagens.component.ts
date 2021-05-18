import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PersonagensService } from 'src/app/core/personagens.service';
import { Personagem } from 'src/app/shared/models/personagem';
import { Alerta } from 'src/app/shared/models/alerta';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';

@Component({
  selector: 'dio-visualizar-personagens',
  templateUrl: './visualizar-personagens.component.html',
  styleUrls: ['./visualizar-personagens.component.css']
})
export class VisualizarFilmesComponent implements OnInit {
  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';
  personagem: Personagem;
  id: number;

  constructor(public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private personagensService: PersonagensService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

  editar(): void {
    this.router.navigateByUrl('/personagens/cadastro/' + this.id);
  }

  excluir(): void {
    const config = {
      data: {
        nome: 'Você tem certeza que deseja excluir?',
        descricao: 'Caso você tenha certceza que deseja excluir, clique no botão OK',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuirBtnFechar: true
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.personagensService.excluir(this.id)
        .subscribe(() => this.router.navigateByUrl('/personagens'));
      }
    });
  }

  private visualizar(): void {
    this.personagensService.visualizar(this.id).subscribe((personagem: Personagem) => this.personagem = personagem);
  }

}
