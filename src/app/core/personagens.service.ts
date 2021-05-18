import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personagem } from '../shared/models/personagem';
import { ConfigPrams } from '../shared/models/config-prams';
import { ConfigParamsService } from './config-params.service';

const url = 'http://localhost:3000/personagens/';

@Injectable({
  providedIn: 'root'
})
export class PersonagensService {

  constructor(private http: HttpClient,
              private configService: ConfigParamsService) { }

  salvar(personagem: Personagem): Observable<Personagem> {
    return this.http.post<Personagem>(url, personagem);
  }

  editar(personagem: Personagem): Observable<Personagem> {
    return this.http.put<Personagem>(url + personagem.id, personagem);
  }

  listar(config: ConfigPrams): Observable<Personagem[]> {
    const configPrams = this.configService.configurarParametros(config);
    return this.http.get<Personagem[]>(url, {params: configPrams});
  }

  visualizar(id: number): Observable<Personagem> {
    return this.http.get<Personagem>(url + id);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }
}
