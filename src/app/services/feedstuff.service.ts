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
import { Feedstuff } from './../models/feedstuff';
import { FeedstuffElement } from './../models/feedstuff-element';
import { FormulationFeedstuff } from './../models/formulation-feedstuff';
import { SuggestedValue } from './../models/suggested-value';

@Injectable()
export class FeedstuffService extends BaseService {

  constructor(http: Http) {
    super(http);
  }

  public listFeedstuffs(): Observable<Feedstuff[]> {
    return this.get(environment.api.uri + '/api/feedstuff/listFeedstuffs')
      .map((res: Response) => {
        const obj: Feedstuff[] = res.json();
        return obj.map((x) => Feedstuff.mapFeedstuff(x));
      });
  }

  public listUserFeedstuffs(): Observable<Feedstuff[]> {
    return this.get(environment.api.uri + '/api/feedstuff/listUserFeedstuffs')
      .map((res: Response) => {
        const obj: Feedstuff[] = res.json();
        return obj.map((x) => Feedstuff.mapFeedstuff(x));
      });
  }

  public findSuggestedValues(formulaId: string, feedstuffId: string): Observable<any> {
    return this.get(environment.api.uri + '/api/feedstuff/findSuggestedValues?formulaId=' + formulaId + '&feedstuffId=' + feedstuffId)
      .map((res: Response) => {
        const obj: SuggestedValue = res.json();
        return new SuggestedValue(obj.minimum, obj.maximum);
      });
  }

  public listExampleFeedstuffs(): Observable<FormulationFeedstuff[]> {
    return this.get(environment.api.uri + '/api/feedstuff/listExampleFeedstuffs')
      .map((res: Response) => {
        const obj: FormulationFeedstuff[] = res.json();
        return obj.map((x) => FormulationFeedstuff.mapFormulationFeedstuff(x));
      });
  }

  public saveUserFeedstuff(feedstuff: Feedstuff): Observable<Feedstuff> {
    return this.post(environment.api.uri + `/api/feedstuff/saveUserFeedstuff`, feedstuff)
      .map((res: Response) => {
        const obj: Feedstuff = res.json();
        return Feedstuff.mapFeedstuff(obj);
      });
  }

  public findUserFeedstuff(feedstuffId: string): Observable<Feedstuff> {
    return this.get(environment.api.uri + `/api/feedstuff/findUserFeedstuff?feedstuffId=${feedstuffId}`)
      .map((res: Response) => {
        const obj: Feedstuff = res.json();
        return Feedstuff.mapFeedstuff(obj);
      });
  }

  public createUserFeedstuff(name: string, description: string): Observable<Feedstuff> {
    return this.post(environment.api.uri + '/api/feedstuff/createUserFeedstuff', {
      name,
      description,
    }).map((res: Response) => {
        const obj: Feedstuff = res.json();
        return Feedstuff.mapFeedstuff(obj);
      });
  }
}
