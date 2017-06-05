// Imports
import { Observable } from 'rxjs/Observable';

// Imports services
import { MainService } from './../services/main.service';

export class OwnFeedstuffsViewModel {
    public feedstuffs: any[] = [];
    public currentTimestamp = new Date();

    public errorMessage = null;

    public newFeedstuff: any = {
        errorMessage: null,
        name: null,
    };

    constructor(private mainService: MainService) { }
}