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

@Injectable()
export class OwnFeedstuffsService extends BaseService {

  constructor(http: Http) {
    super(http);
  }

  public listFeedstuffsForUser(): Observable<any[]> {
    return this.get(environment.api.uri + '/api/feedstuff/listUserFeedstuffs')
      .map((res: Response) => res.json());
  }

  public createFeedstuffForUser(name: string, description: string): Observable<any> {
    return this.post(environment.api.uri + '/api/feedstuff/createUserFeedstuff', {
      name,
      description,
    })
      .map((res: Response) => res.json());
  }

  public listUserFeedstuffMeasurements(feedstuffId: string): Observable<any[]> {
    return this.get(environment.api.uri + `/api/feedstuff/listUserFeedstuffMeasurements?feedstuffId=${feedstuffId}`)
      .map((res: Response) => res.json());
  }

  public findUserFeedstuff(feedstuffId: string): Observable<any> {
    return this.get(environment.api.uri + `/api/feedstuff/findUserFeedstuff?feedstuffId=${feedstuffId}`)
      .map((res: Response) => res.json());
  }

  public saveUserFeedstuffMeasurements(feedstuffId: string, measurements: any[]): Observable<any> {
    return this.post(environment.api.uri + `/api/feedstuff/saveUserFeedstuffMeasurements`, {
      feedstuffId,
      measurements,
    })
      .map((res: Response) => res.json());
  }

}
