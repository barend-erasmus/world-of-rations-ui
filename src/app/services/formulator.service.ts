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
import { CompositionElement } from './../models/composition-element';
import { Formula } from './../models/formula';
import { Formulation } from './../models/formulation';
import { FormulationFeedstuff } from './../models/formulation-feedstuff';
import { FormulationResult } from './../models/formulation-result';
import { SupplementElement } from './../models/supplement-element';
import { SupplementFeedstuff } from './../models/supplement-feedstuff';

@Injectable()
export class FormulatorService extends BaseService {

  constructor(http: Http) {
    super(http);
  }

  public formulate(requestObj: any): Observable<FormulationResult> {
    return this.post(environment.api.uri + '/api/formulator/formulate', requestObj)
      .map((res: Response) => {
        const obj: FormulationResult = res.json();
        return new FormulationResult(obj.id, obj.feasible, obj.currencyCode, obj.cost);
      });
  }

  public findFormulation(formulationId: string): Observable<Formulation> {
    return this.get(environment.api.uri + '/api/formulator/findFormulation?formulationId=' + formulationId)
      .map((res: Response) => {
        const obj: Formulation = res.json();
        return Formulation.mapFormulation(obj);
      });
  }

  public listFormulations(): Observable<Formulation[]> {
    return this.get(environment.api.uri + '/api/formulator/listFormulations')
      .map((res: Response) => {
        const obj: Formulation[] = res.json();
        return obj.map((x) => Formulation.mapFormulation(x));
      });
  }

}
