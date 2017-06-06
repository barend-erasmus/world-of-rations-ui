// Imports services
import { MainService } from './../services/main.service';

// Imports models
import { Formulation } from './../models/formulation';
import { FormulationFeedstuff } from './../models/formulation-feedstuff';
import { CompositionElement } from './../models/composition-element';

export class FormulationViewModel {

    public isActive: boolean = false;

    public formulation: Formulation;

    public totalWeightOfFeedstuffInFormulation: string;
    public totalCostOfFeedstuffInFormulation: string;
    public totalWeightOfSupplementFeedstuffInFormulation: number;

    constructor(private mainService: MainService, private formulationId: string) {
        this.loadFormulation();
    }

    private loadFormulation(): void {
        this.mainService.formulatorService.findFormulation(this.formulationId).subscribe((formulation: Formulation): void => {
            formulation.feedstuffs.sort((a: FormulationFeedstuff, b: FormulationFeedstuff) => {
                return (b.weight < a.weight) ? -1 : 1;
            });
            
            formulation.composition.sort((a: CompositionElement, b: CompositionElement) => {
                return (a.sortOrder < b.sortOrder) ? -1 : 1;
            });

            formulation.feedstuffs = formulation.feedstuffs;

            this.formulation = formulation;

            this.isActive = true;
        });
    }

    
}