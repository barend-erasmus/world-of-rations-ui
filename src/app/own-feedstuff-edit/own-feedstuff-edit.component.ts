import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// Services
import { OwnFeedstuffsService } from '../services/own-feedstuffs.service';

@Component({
  selector: 'app-own-feedstuff-edit',
  templateUrl: './own-feedstuff-edit.component.html',
})
export class OwnFeedstuffEditComponent implements OnInit {

  public feedstuff: any = null;
  public elements: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, private ownFeedstuffsService: OwnFeedstuffsService) { }

  public ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const feedstuffId = params['feedstuffId'];
      this.ownFeedstuffsService.findUserFeedstuff(feedstuffId).subscribe((getFeedstuffResult: any) => {
        this.feedstuff = getFeedstuffResult;
        this.feedstuff.id = feedstuffId;

        this.elements = this.feedstuff.elements;

      });
    });
  }

  public onClick_Save() {
    this.ownFeedstuffsService.saveUserFeedstuff(this.feedstuff, this.elements.map((x) => {
      return {
        id: x.id,
        value: x.value,
      };
    })).subscribe((saveUserFeedstuffResult: boolean) => {
      window.location.href = '/ownfeedstuffs';
    });
  }

}
