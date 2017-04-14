// Imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  public ngOnInit() {
    this.activatedRoute.queryParams.subscribe(this.subscribeToActivatedRouteQueryParams);
  }

  private subscribeToActivatedRouteQueryParams(params: Params): void {
     if (params['token'] === undefined) {

        window.location.href = environment.api.uri + '/api/auth/google';
      } else {
        localStorage.setItem('jwt.token', params['token']);
        window.location.href = '/';
      }
  }
}
