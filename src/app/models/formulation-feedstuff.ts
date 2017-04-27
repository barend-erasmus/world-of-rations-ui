// Imports models
import { Feedstuff } from './feedstuff';

export class FormulationFeedstuff extends Feedstuff {

    public isLoading: boolean = false;
    public selectedFeedstuffName: string = null;
    public selectedFeedstuff: FormulationFeedstuff = null;

    constructor(id: string, name: string, public cost: number, public weight: number, public minimum: number, public maximum: number) {
        super(id, name);
        this.selectedFeedstuffName = name;
        this.selectedFeedstuff = this;

    }
}
