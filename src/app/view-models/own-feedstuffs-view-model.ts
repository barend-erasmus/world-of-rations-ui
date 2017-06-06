// Imports
import { Observable } from 'rxjs/Observable';

// Imports services
import { MainService } from './../services/main.service';

// Imports models
import { Feedstuff } from './../models/feedstuff';

export class OwnFeedstuffsViewModel {
    public feedstuffs: Feedstuff[] = [];
    public currentTimestamp = new Date();

    public validationMessages: string[] = [];

    public newFeedstuff: Feedstuff = new Feedstuff(null, null, null, null, null);

    constructor(private mainService: MainService) {
        this.loadFeedstuffs();
    }

    private loadFeedstuffs(): void {
        this.mainService.feedstuffService.listUserFeedstuffs().subscribe((result: any[]) => {
            this.feedstuffs = result;
        }, (error: Error) => {
            this.validationMessages.push('An error has occurred while loading feedstuff');
        });
    }

    public onClick_CreateFeedstuff(): void {

        if (this.newFeedstuff.name === null) {
            this.validationMessages.push('Please enter a name');
            return;
        }
        this.mainService.feedstuffService.createUserFeedstuff(this.newFeedstuff.name, null).subscribe((result: any) => {
            window.location.href = `/ownfeedstuffedit?feedstuffId=${result.id}`;
        }, (error: Error) => {
            console.log(error);
            this.validationMessages.push('An error has occurred while creating feedstuff');
        });

        this.newFeedstuff.name = null;
    }

    public onClick_EditFeedstuff(item: Feedstuff): void {
        window.location.href = `/ownfeedstuffedit?feedstuffId=${item.id}`;
    }
}