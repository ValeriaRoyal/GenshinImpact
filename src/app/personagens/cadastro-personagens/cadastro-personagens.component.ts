import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Personagem } from 'src/app/shared/models/personagem';
import { PersonagensService } from 'src/app/core/personagens.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';

@Component({
  selector: 'dio-cadastro-personagens',
  templateUrl: './cadastro-personagens.component.html',
  styleUrls: ['./cadastro-personagens.component.scss']
})
export class CadastroPersonagensComponent implements OnInit {

  id: number;
  cadastro: FormGroup;
  generos: Array<string>;

  constructor(public validacao: ValidarCamposService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              private personagemService: PersonagensService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.personagemService.visualizar(this.id)
        .subscribe((personagem: Personagem) => this.criarFormulario(personagem));
    } else {
      this.criarFormulario(this.criarPersonagemEmBranco());
    }

    this.elementos = ['Pyro', 'Hydro', 'Dendro', 'Electro', 'Anemo', 'Cryo', 'Geo'];

  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    const personagem = this.cadastro.getRawValue() as Personagem;
    if (this.id) {
      personagem.id = this.id;
      this.editar(personagem);
    } else {
      this.salvar(personagem);
    }
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private criarFormulario(personagem: Personagem): void {
    this.cadastro = this.fb.group({
      nome: [personagem.nome, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: [personagem.urlFoto, [Validators.minLength(10)]],
      dtLancamento: [personagem.dtLancamento, [Validators.required]],
      descricao: [personagem.descricao],
      nota: [personagem.nota, [Validators.required, Validators.min(0), Validators.max(10)]],
      url: [personagem.url, [Validators.minLength(10)]],
      elemento: [personagem.elemento, [Validators.required]]
    });
  }

  private criarFilmeEmBranco(): Personagem {
    return {
      id: null,
      nome: null,
      dtLancamento: null,
      urlFoto: null,
      descricao: null,
      nota: null,
      url: null,
      elemento: null
    } as Personagem;
  }

  private salvar(personagem: Personagem): void {
    this.personagemService.salvar(personagem).subscribe(() => {
      const config = {
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar um novo personagem',
          corBtnCancelar: 'primary',
          possuirBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
          this.router.navigateByUrl('filmes');
        } else {
          this.reiniciarForm();
        }
      });
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao salvar o registro!',
          descricao: 'Não conseguimos salvar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

  private editar(personagem: Personagem): void {
    this.personagemService.editar(personagem).subscribe(() => {
      const config = {
        data: {
          descricao: 'Seu registro foi atualizado com sucesso!',
          btnSucesso: 'Ir para a listagem',
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('personagens'));
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao editar o registro!',
          descricao: 'Não conseguimos editar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

}
