import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { PersonagensService } from 'src/app/core/personagens.service';
import { Personagem } from 'src/app/shared/models/personagem';
import { ConfigPrams } from 'src/app/shared/models/config-prams';

@Component({
  selector: 'dio-listagem-personagens',
  templateUrl: './listagem-personagens.component.html',
  styleUrls: ['./listagem-personagens.component.scss']
})
export class ListagemFilmesComponent implements OnInit {
  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';

  config: ConfigPrams = {
    pagina: 0,
    limite: 4
  };
  personagens: Personagem[] = [];
  filtrosListagem: FormGroup;
  generos: Array<string>;

  constructor(private filmesService: PersonagensService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });

    this.filtrosListagem.get('texto').valueChanges
    .pipe(debounceTime(400))
    .subscribe((val: string) => {
      this.config.pesquisa = val;
      this.resetarConsulta();
    });

    this.filtrosListagem.get('genero').valueChanges.subscribe((val: string) => {
      this.config.campo = {tipo: 'genero', valor: val};
      this.resetarConsulta();
    });

    this.generos = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Aventura', 'Drama'];

    this.listarPersonagens();
  }

  onScroll(): void {
    this.listarPersonagens();
  }

  abrir(id: number): void {
    this.router.navigateByUrl('/personagens/' + id);
  }

  private listarPersonagens(): void {
    this.config.pagina++;
    this.filmesService.listar(this.config)
      .subscribe((personagens: Personagem[]) => this.personagens.push(...personagens));
  }

  private resetarConsulta(): void {
    this.config.pagina = 0;
    this.personagens = [];
    this.listarPersonagens();
  }
}
