// Imports
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// Imports environment
import { environment } from './../../environments/environment';

// Imports services
import { MainService } from './../services/main.service';

// Imports models
import { Formulation } from './../models/formulation';

export class FooterViewModel {
    public formulations: Formulation[] = [];

    public isAuthenticated: boolean;
    public decodedToken: any;

    constructor(private http: Http, private mainService: MainService) {
        this.validateJWT();
        this.loadFormulations();
    }

    public logout(): void {
        localStorage.removeItem('jwt.token');
        this.isAuthenticated = localStorage.getItem('jwt.token') != null;
        this.decodedToken = null;
    }

    private validateJWT(): void {
        const headers = new Headers();

        const jwtToken = localStorage.getItem('jwt.token');

        if (jwtToken !== null || jwtToken === '') {
            headers.append('Authorization', 'Bearer ' + jwtToken);
        }

        this.http.get(`${environment.api.uri}/api/auth/verify`, {
            headers,
        }).map((res: Response) => res).subscribe((result: Response) => {
            if (result.status === 200) {
                this.decodedToken = result.json();
                this.isAuthenticated = true;
            }
        }, (error: Error) => {
            if (window.location.pathname !== '/login') {
                this.logout();
            }
        });
    }

    private loadFormulations(): void {
        this.mainService.formulatorService.listFormulations().subscribe((listFormulationsResult: Formulation[]) => {
            this.formulations = listFormulationsResult;
        }, (error: Error) => {
            console.error(error);
        });
    }
}