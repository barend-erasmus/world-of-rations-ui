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

    public onSelect_SupplementFeedstuff(supplementElement, selectedSupplementFeedstuff): void {
        if (supplementElement === null || selectedSupplementFeedstuff === null || supplementElement.supplementFeedstuffs === null) {
            return;
        }

        for (const supplmentFeedstuff of supplementElement.supplementFeedstuffs) {
            if (supplmentFeedstuff.id === selectedSupplementFeedstuff.id) {
                supplementElement.selectedSupplementFeedstuffs = [supplmentFeedstuff];
            }
        }

        this.updateTotals();
    }

    private loadFormulation() {
        this.mainService.formulatorService.findFormulation(this.formulationId).subscribe((formulation: Formulation): void => {
            formulation.feedstuffs.sort((a: FormulationFeedstuff, b: FormulationFeedstuff) => {
                return (b.weight < a.weight) ? -1 : 1;
            });
            formulation.composition.sort((a: CompositionElement, b: CompositionElement) => {
                return (a.sortOrder < b.sortOrder) ? -1 : 1;
            });

            formulation.feedstuffs = formulation.feedstuffs.filter((x) => x.weight !== 0);

            this.formulation = formulation;
            this.updateTotals();

            this.isActive = true;
        });
    }

    private updateTotals(): void {
        this.totalWeightOfFeedstuffInFormulation = this.getTotalWeightOfFeedstuffInFormulation();
        this.totalCostOfFeedstuffInFormulation = this.getTotalCostOfFeedstuffInFormulation();
        this.totalWeightOfSupplementFeedstuffInFormulation = this.getTotalWeightOfSupplementFeedstuffInFormulation();
    }

    private getTotalWeightOfFeedstuffInFormulation(): string {
        return this.formulation.feedstuffs.map((x) => x.weight).reduce((a, b) => a + b, 0).toFixed(2);
    }

    private getTotalCostOfFeedstuffInFormulation(): string {
        return this.formulation.feedstuffs.map((x) => x.weight * (x.cost / 1000)).reduce((a, b) => a + b, 0).toFixed(2);
    }

    private getTotalWeightOfSupplementFeedstuffInFormulation(): number {
        return this.formulation.supplementElements.map((x) => x.selectedSupplementFeedstuffs[0] === undefined ? 0 : x.selectedSupplementFeedstuffs[0].weight).reduce((a, b) => a + b, 0);
    }
}