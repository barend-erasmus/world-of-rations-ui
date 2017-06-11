// Imports
import { Observable } from 'rxjs/Observable';

// Imports services
import { MainService } from './../services/main.service';

// Imports models
import { Feedstuff } from './../models/feedstuff';
import { FeedstuffElement } from './../models/feedstuff-element';

export class OwnFeedstuffEditViewModel {

    public feedstuff: Feedstuff = null;

    constructor(feedstuffId: string, private mainService: MainService) {
        this.loadFeedstuff(feedstuffId);
    }

    public onClick_Save() {
        this.mainService.feedstuffService.saveUserFeedstuff(this.feedstuff).subscribe((saveUserFeedstuffResult: any) => {
            window.location.href = '/ownfeedstuffs';
        });
    }

    private loadFeedstuff(feedstuffId: string): void {
        this.mainService.feedstuffService.findUserFeedstuff(feedstuffId).subscribe((getFeedstuffResult: any) => {
            this.feedstuff = getFeedstuffResult;

            this.feedstuff.elements.sort((a: FeedstuffElement, b: FeedstuffElement) => {
                return (b.sortOrder < a.sortOrder) ? 1 : -1;
            });

            this.feedstuff.id = feedstuffId;
        });
    }


}