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

// Imports view models
import { AuthViewModel } from './auth-view-model';

export class FooterViewModel extends AuthViewModel {
    public formulations: Formulation[] = [];

    constructor(http: Http, mainService: MainService) {
        super(http, mainService);
        this.loadFormulations();
    }

    private loadFormulations(): void {
        this.mainService.formulatorService.listFormulations().subscribe((listFormulationsResult: Formulation[]) => {
            this.formulations = listFormulationsResult;
        }, (error: Error) => {
            console.error(error);
        });
    }
}