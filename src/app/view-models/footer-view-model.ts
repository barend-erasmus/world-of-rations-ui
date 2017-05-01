// Imports services
import { MainService } from './../services/main.service';

// Imports models
import { Formulation } from './../models/formulation';

export class FooterViewModel {
    public formulations: Formulation[] = [];

    constructor(private mainService: MainService) {
        this.loadFormulations();
    }

    private loadFormulations(): void {
        this.mainService.formulatorService.listFormulations().subscribe((listFormulationsResult: Formulation[]) => {
            this.formulations = listFormulationsResult;
        }, (error: Error) => {
            console.error(error);
        });
    }
}