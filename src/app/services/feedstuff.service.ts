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
import { ExampleFeedstuff } from './../models/example-feedstuff';
import { Feedstuff } from './../models/feedstuff';
import { FeedstuffElement } from './../models/feedstuff-element';
import { FormulationFeedstuff } from './../models/formulation-feedstuff';
import { SuggestedValue } from './../models/suggested-value';
import { UserFeedstuff } from './../models/user-feedstuff';

@Injectable()
export class FeedstuffService extends BaseService {

  constructor(http: Http) {
    super(http);
  }

  public listFeedstuffs(): Observable<Feedstuff[]> {
    return this.get(environment.api.uri + '/api/feedstuff/listFeedstuffs')
      .map((res: Response) => {
        const obj: Feedstuff[] = res.json();

        return obj.map((x) => new Feedstuff(x.id, x.name));
      });
  }

  public listUserFeedstuffs(): Observable<UserFeedstuff[]> {
    return this.get(environment.api.uri + '/api/feedstuff/listUserFeedstuffs')
      .map((res: Response) => {
        const obj: UserFeedstuff[] = res.json();

        return obj.map((x) => new UserFeedstuff(x.id, x.name, null));
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
        const obj: ExampleFeedstuff[] = res.json();

        return obj.map((x) => new FormulationFeedstuff(x.id, x.name, x.cost, 0, x.minimum, x.maximum));
      });
  }

  public saveUserFeedstuff(feedstuff: UserFeedstuff): Observable<UserFeedstuff> {
    return this.post(environment.api.uri + `/api/feedstuff/saveUserFeedstuff`, feedstuff)
      .map((res: Response) => {
        const obj: UserFeedstuff = res.json();

        return new UserFeedstuff(obj.id, obj.name, obj.elements.map((y) => new FeedstuffElement(y.id, y.name, y.unit, y.code, y.sortOrder, y.value)));
      });
  }

  public findUserFeedstuff(feedstuffId: string): Observable<UserFeedstuff> {
    return this.get(environment.api.uri + `/api/feedstuff/findUserFeedstuff?feedstuffId=${feedstuffId}`)
      .map((res: Response) => {
        const obj: UserFeedstuff = res.json();

        return new UserFeedstuff(obj.id, obj.name, obj.elements.map((y) => new FeedstuffElement(y.id, y.name, y.unit, y.code, y.sortOrder, y.value)));
      });
  }

  public createUserFeedstuff(name: string, description: string): Observable<UserFeedstuff> {
    return this.post(environment.api.uri + '/api/feedstuff/createUserFeedstuff', {
      name,
      description,
    })
      .map((res: Response) => {
        const obj: UserFeedstuff = res.json();

        return new UserFeedstuff(obj.id, obj.name, obj.elements === null? null: obj.elements.map((y) => new FeedstuffElement(y.id, y.name, y.unit, y.code, y.sortOrder, y.value)));
      });
  }
}
