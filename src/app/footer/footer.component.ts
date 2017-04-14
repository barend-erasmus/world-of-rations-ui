// Imports
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

// Imports services
import { MainService } from './../services/main.service';

// // Imports models
import { Formulation } from './../models/formulation';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {

  public formulations: Formulation[] = [];

  constructor(private mainService: MainService) { }

  public ngOnInit() {
    this.loadFormulations();
  }

  private loadFormulations() {
    this.mainService.formulatorService.listFormulations().subscribe((listFormulationsResult: Formulation[]) => {
      this.formulations = listFormulationsResult;
    }, (error: Error) => {
      // console.log(error);
    });
  }

}