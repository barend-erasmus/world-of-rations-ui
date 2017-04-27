import { Component, OnInit } from '@angular/core';

// Services
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-own-feedstuffs',
  templateUrl: './own-feedstuffs.component.html',
})
export class OwnFeedstuffsComponent implements OnInit {

  public feedstuffs: any[] = [];
  public currentTimestamp = new Date();

  public errorMessage = null;

  public newFeedstuff: any = {
    errorMessage: null,
    name: null,
  };

  constructor(private mainService: MainService) { }

  public ngOnInit() {
    this.mainService.feedstuffService.listUserFeedstuffs().subscribe((result: any[]) => {
      this.feedstuffs = result;
    }, (error: Error) => {
      this.errorMessage = 'An error has occurred while loading feedstuff';
    });
  }

  public onClick_CreateFeedstuff() {

    if (this.newFeedstuff.name === null) {
      this.newFeedstuff.errorMessage = 'Please enter a name';
      return;
    }
    this.mainService.feedstuffService.createUserFeedstuff(this.newFeedstuff.name, null).subscribe((result: any) => {
      window.location.href = `/ownfeedstuffedit?feedstuffId=${result.id}`;
    }, (error: Error) => {
      this.newFeedstuff.errorMessage = 'An error has occurred while creating feedstuff';
    });

    this.newFeedstuff.name = null;
  }

  public onClick_EditFeedstuff(item: any) {
    window.location.href = `/ownfeedstuffedit?feedstuffId=${item.id}`;
  }

}
