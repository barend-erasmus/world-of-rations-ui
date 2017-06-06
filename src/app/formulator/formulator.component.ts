// Imports
import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component'

// imports services
import { MainService } from '../services/main.service';

// Imports view models
import { FormulatorViewModel } from './../view-models/formulator-view-model';


@Component({
  selector: 'app-formulator',
  styleUrls: ['./formulator.component.css'],
  templateUrl: './formulator.component.html',
})
export class FormulatorComponent implements OnInit {

  public model: FormulatorViewModel;

  constructor(private mainService: MainService) { }

  public ngOnInit(): void {

    this.model = new FormulatorViewModel(this.mainService);
  }
}
