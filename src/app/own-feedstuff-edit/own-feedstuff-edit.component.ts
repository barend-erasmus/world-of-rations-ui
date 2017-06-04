import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// Services
import { MainService } from '../services/main.service';

// Imports models
import { Feedstuff } from './../models/feedstuff';
import { FeedstuffElement } from './../models/feedstuff-element';

@Component({
  selector: 'app-own-feedstuff-edit',
  templateUrl: './own-feedstuff-edit.component.html',
})
export class OwnFeedstuffEditComponent implements OnInit {

  public feedstuff: Feedstuff = null;

  constructor(private activatedRoute: ActivatedRoute, private mainService: MainService) { }

  public ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const feedstuffId = params['feedstuffId'];
      this.mainService.feedstuffService.findUserFeedstuff(feedstuffId).subscribe((getFeedstuffResult: any) => {
        this.feedstuff = getFeedstuffResult;

        this.feedstuff.elements.sort((a: FeedstuffElement, b: FeedstuffElement) => {
          return (b.sortOrder < a.sortOrder) ? 1 : -1;
        });

        this.feedstuff.id = feedstuffId;
      });
    });
  }

  public onClick_Save() {
    this.mainService.feedstuffService.saveUserFeedstuff(this.feedstuff).subscribe((saveUserFeedstuffResult: any) => {
      window.location.href = '/ownfeedstuffs';
    });
  }

}
