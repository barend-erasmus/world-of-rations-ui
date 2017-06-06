// Imports
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

// Imports services
import { MainService } from './../services/main.service';

// Imports models
import { FooterViewModel } from './../view-models/footer-view-model';

// Imports view models
import { Formulation } from './../models/formulation';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {

  public model: FooterViewModel;

  constructor(private http: Http, private mainService: MainService) { }

  public ngOnInit(): void {
    this.model = new FooterViewModel(this.http, this.mainService);
  }

}
