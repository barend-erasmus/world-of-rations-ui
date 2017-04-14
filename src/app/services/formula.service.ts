// Imports
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

// Imports configuration
import { environment } from './../../environments/environment';

// Imports services
import { BaseService } from './base.service';

// Imports models
import { Formula } from './../models/formula';

@Injectable()
export class FormulaService extends BaseService {

  constructor(http: Http) {
    super(http);
   }

  public listFormulas(): Observable<Formula[]>  {
    return this.get(environment.api.uri + '/api/formula/listFormula')
      .map((res: Response) => res.json());
  }

}
