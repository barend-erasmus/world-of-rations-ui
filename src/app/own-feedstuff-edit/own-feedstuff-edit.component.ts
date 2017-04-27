import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// Services
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-own-feedstuff-edit',
  templateUrl: './own-feedstuff-edit.component.html',
})
export class OwnFeedstuffEditComponent implements OnInit {

  public feedstuff: any = null;
  public elements: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, private mainService: MainService) { }

  public ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const feedstuffId = params['feedstuffId'];
      this.mainService.feedstuffService.findUserFeedstuff(feedstuffId).subscribe((getFeedstuffResult: any) => {
        this.feedstuff = getFeedstuffResult;
        this.feedstuff.id = feedstuffId;

        this.elements = this.feedstuff.elements;

      });
    });
  }

  public onClick_Save() {
    this.mainService.feedstuffService.saveUserFeedstuff(this.feedstuff).subscribe((saveUserFeedstuffResult: any) => {
      window.location.href = '/ownfeedstuffs';
    });
  }

}
