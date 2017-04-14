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

  private loadFormulations(): void {
    this.mainService.formulatorService.listFormulations().subscribe(this.subscribeToFormulatorServiceListFormulations, this.handleError);
  }

  private subscribeToFormulatorServiceListFormulations(listFormulationsResult: Formulation[]) {
    this.formulations = listFormulationsResult;
  }

  private handleError(error: Error) {
    console.error(error);
  }

}
