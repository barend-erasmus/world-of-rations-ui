// Imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// Imports services
import { MainService } from '../services/main.service';

// Imports view models
import { FormulationViewModel } from './../view-models/formulation-view-model';

@Component({
  selector: 'app-formulation',
  templateUrl: './formulation.component.html',
})
export class FormulationComponent implements OnInit {

  public model: FormulationViewModel;

  constructor(private activatedRoute: ActivatedRoute, private mainService: MainService) { }

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params): void => {
      const formulationId: string = params['formulationId'];
      this.model = new FormulationViewModel(this.mainService, formulationId);
    });
  }
}
