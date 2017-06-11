import { Component, OnInit } from '@angular/core';

// imports services
import { MainService } from '../services/main.service';

// Imports view models
import { OwnFeedstuffsViewModel } from './../view-models/own-feedstuffs-view-model';

@Component({
  selector: 'app-own-feedstuffs',
  templateUrl: './own-feedstuffs.component.html',
})
export class OwnFeedstuffsComponent implements OnInit {

  public model: any = null;

  constructor(private mainService: MainService) { }

  public ngOnInit(): void {
    this.model = new OwnFeedstuffsViewModel(this.mainService);
  }
}
