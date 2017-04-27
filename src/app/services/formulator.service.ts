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

        return new Formulation(
          obj.id,
          obj.feasible,
          obj.currencyCode,
          obj.cost,
          obj.feedstuffs.map((x) => new FormulationFeedstuff(x.id, x.name, x.cost, x.weight, x.minimum, x.maximum)),
          new Formula(obj.formula.id, obj.formula.name),
          obj.composition.map((x) => new CompositionElement(x.id, x.name, x.unit, x.status, x.value, x.sortOrder)),
          obj.supplementElements.map((x) => new SupplementElement(x.id, x.name, x.unit, x.sortOrder, x.selectedSupplementFeedstuffs.map((y) => new SupplementFeedstuff(y.id, y.text, y.weight)), x.supplementFeedstuffs.map((y) => new SupplementFeedstuff(y.id, y.text, y.weight)))));
      });
  }

  public listFormulations(): Observable<Formulation[]> {
    return this.get(environment.api.uri + '/api/formulator/listFormulations')
      .map((res: Response) => {
        const obj: Formulation[] = res.json();

        return obj.map((x) => new Formulation(x.id, x.feasible, x.currencyCode, x.cost, null, new Formula(x.formula.id, x.formula.name), null, null));
      });
  }

}
