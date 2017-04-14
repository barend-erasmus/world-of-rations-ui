// Imports
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

// Imports configuration
import { environment } from './../../environments/environment';

// Imports services
import { BaseService } from './base.service';

// Imports models
import { Formulation } from './../models/formulation';

@Injectable()
export class FormulatorService extends BaseService {

  constructor(http: Http) {
    super(http);
   }

  public formulate(obj: any) {
    return this.post(environment.api.uri + '/api/formulator/formulate', obj)
    .map((res: Response) => res.json());
  }

  public findFormulation(formulationId: string): Observable<Formulation> {
    return this.get(environment.api.uri + '/api/formulator/findFormulation?formulationId=' + formulationId)
    .map((res: Response) => res.json());
  }

  public listFormulations(): Observable<Formulation[]> {
    return this.get(environment.api.uri + '/api/formulator/listFormulations')
    .map((res: Response) => res.json());
  }

}
