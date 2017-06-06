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

  

}
