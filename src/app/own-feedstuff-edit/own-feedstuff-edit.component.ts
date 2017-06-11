import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// Services
import { MainService } from '../services/main.service';

// Imports view models
import { OwnFeedstuffEditViewModel } from './../view-models/own-feedstuff-edit-view-model';

@Component({
  selector: 'app-own-feedstuff-edit',
  templateUrl: './own-feedstuff-edit.component.html',
})
export class OwnFeedstuffEditComponent implements OnInit {

  public model: OwnFeedstuffEditViewModel = null;

  constructor(private activatedRoute: ActivatedRoute, private mainService: MainService) { }

  public ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const feedstuffId = params['feedstuffId'];
      this.model = new OwnFeedstuffEditViewModel(feedstuffId, this.mainService);
    });
  }


}
