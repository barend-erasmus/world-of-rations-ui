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

@Injectable()
export class FeedstuffService extends BaseService {

  constructor(http: Http) {
    super(http);
   }

  public listFeedstuffs(): Observable<Feedstuff[]> {
    return this.get(environment.api.uri + '/api/feedstuff/listFeedstuffs')
      .map((res: Response) => res.json());
  }

  public findSuggestedValues(formulaId: string, feedstuffId: string) {
    return this.get(environment.api.uri + '/api/feedstuff/findSuggestedValues?formulaId=' + formulaId + '&feedstuffId=' + feedstuffId)
      .map((res: Response) => res.json());
  }

  public listExampleFeedstuffs() {
    return this.get(environment.api.uri + '/api/feedstuff/listExampleFeedstuffs')
      .map((res: Response) => {
        const result: any[] = res.json();
        const resultArr: any[] = [];

        for (const feedstuff of result) {
          resultArr.push({
            cost: feedstuff.cost,
            isLoading: false,
            maximum: feedstuff.maximum,
            minimum: feedstuff.minimum,
            selectedFeedstuff: {
              id: feedstuff.id,
              name: feedstuff.name,
              searchText: feedstuff.searchText,
            },
            selectedFeedstuffName: feedstuff.name,
          });
        }

        return resultArr;
      });
  }
}
