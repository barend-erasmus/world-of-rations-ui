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
import { TreeNode } from './../models/tree-node';

@Injectable()
export class FormulaService extends BaseService {

  constructor(http: Http) {
    super(http);
   }

  public listFormulas(): Observable<Formula[]>  {
    return this.get(environment.api.uri + '/api/formula/listFormulas')
      .map((res: Response) => {
        const obj: Formula[] = res.json();
        return obj.map((x) => Formula.mapFormula(x));
      });
  }

  public listFormulaTreeNodes(): Observable<TreeNode[]>  {
    return this.get(environment.api.uri + '/api/formula/listFormulaTreeNodes')
      .map((res: Response) => {
        const obj: TreeNode[] = res.json();
        return obj;
      });
  }

}
