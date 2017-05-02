// Imports
import { Observable } from 'rxjs/Observable';

// Imports services
import { MainService } from './../services/main.service';

// Imports models
import { Feedstuff } from './../models/feedstuff';
import { FormulationFeedstuff } from './../models/formulation-feedstuff';
import { Formula } from './../models/formula';
import { FormulationResult } from './../models/formulation-result';

export class FormulatorViewModel {

    public formulas: Formula[] = [];
    public formulasDataSource: Observable<any> = null;
    public selectedFormulaName: string;
    public selectedFormula: Formula = null;

    public validationMessage: string = null;

    public feedstuffs: Feedstuff[] = [];

    public currencies: string[] = [];
    public selectedCurrencies: string[];

    public isFormulating: boolean = false;

    public formulationFeedstuffs: FormulationFeedstuff[] = [];
    public formulatorResult: FormulationResult = null;

    constructor(private mainService: MainService) {
        this.initializeCurrencyControl();
        this.loadFeedstuffList();
        this.loadFormulaList();
        this.onClick_ResetToDefaults();
    }

    public queryFormulaList(token: string): Observable<Formula[]> {

        return Observable.of(
            this.formulas.filter((item: Formula) => {
                const isValid = false;

                const splittedName = item.name.split(' ');
                const splittedToken = token.split(' ');

                for (const splittedTokenItem of splittedToken) {
                    if (splittedTokenItem === null || splittedTokenItem === '') {
                        return false;
                    }
                    const query = new RegExp(splittedTokenItem, 'ig');
                    if (query.test(item.name)) {
                        return true;
                    }
                }

                return false;
            }),
        );
    }

    public onSelect_Currency(selectedCurrency): void {
        this.selectedCurrencies = [selectedCurrency.id];
    }

    public onSelect_Feedstuff(item: any, instance: any): void {
        if (item.item !== null) {
            instance.selectedFeedstuff = item.item;
            instance.selectedFeedstuffName = item.item.name;
        }

        if (item.item !== null && this.selectedFormula !== null) {
            instance.isLoading = true;
            this.mainService.feedstuffService.findSuggestedValues(this.selectedFormula.id, instance.selectedFeedstuff.id).subscribe((result: any) => {
                if (result !== null) {
                    instance.minimum = result.minimum;
                    instance.maximum = result.maximum;
                }
                instance.isLoading = false;

                this.updateFeedstuffValidationMessages();
            });
        }
    }

    public onSelect_Formula(item: any): void {
        this.selectedFormula = item.item;
        for (const feedstuff of this.formulationFeedstuffs) {
            this.onSelect_Feedstuff({
                item: feedstuff.selectedFeedstuff,
            }, feedstuff);
        }
    }

    public onClick_AddFeedstuff(): void {
        this.formulationFeedstuffs.push(new FormulationFeedstuff(null, null, null, null, 0, 1000));
    }

    public onClick_RemoveFeedstuff(item: any): void {
        this.formulationFeedstuffs.splice(this.formulationFeedstuffs.indexOf(item), 1);
    }

    public onClick_ResetToDefaults(): void {
        this.mainService.feedstuffService.listExampleFeedstuffs().subscribe((result: any[]) => {
            this.formulationFeedstuffs = result;
        }, (error: Error) => {
            console.error(error);
        });
    }

    public onClick_Formulate(): void {
        this.formulatorResult = null;
        if (this.selectedFormula === null) {
            this.validationMessage = 'Please select a formula';
        } else {

            let isValid = true;

            this.updateFeedstuffValidationMessages();

            for (const feedstuff of this.formulationFeedstuffs) {

                if (feedstuff.errorMessage !== null) {
                    isValid = false;
                }

                if (feedstuff.selectedFeedstuff !== null && this.formulationFeedstuffs.filter((x) => x.selectedFeedstuff != null && x.selectedFeedstuff.id === feedstuff.selectedFeedstuff.id).length > 1) {
                    this.validationMessage = 'Cannot have duplicate feedstuffs';
                    isValid = false;
                }
            }

            if (!isValid) {
                return;
            }

            this.isFormulating = true;
            this.validationMessage = null;
            const feedstuffs: any[] = [];
            for (const feedstuff of this.formulationFeedstuffs) {
                if (feedstuff.selectedFeedstuff != null) {
                    feedstuffs.push({
                        cost: feedstuff.cost,
                        id: feedstuff.selectedFeedstuff.id,
                        maximum: feedstuff.maximum,
                        minimum: feedstuff.minimum,
                    });
                }
            }
            const obj = {
                currencyCode: this.selectedCurrencies[0],
                feedstuffs,
                formulaId: this.selectedFormula.id,
            };

            this.mainService.formulatorService.formulate(obj).subscribe((result: FormulationResult) => {
                this.formulatorResult = result;
                this.isFormulating = false;
            }, (error: Error) => {
                console.error(error);
                this.isFormulating = false;
            });
        }
    }

    private updateFeedstuffValidationMessages(): void {
        for (const feedstuff of this.formulationFeedstuffs) {
            feedstuff.errorMessage = this.validateFeedstuff(feedstuff);
            if (feedstuff.selectedFeedstuff !== null && this.formulationFeedstuffs.filter((x) => x.selectedFeedstuff !== null && x.selectedFeedstuff.id === feedstuff.selectedFeedstuff.id).length > 1) {
                this.validationMessage = 'Cannot have duplicate feedstuffs';
            }
        }
    }

    private validateFeedstuff(item: any): string {

        if (!item.selectedFeedstuff) {
            return 'Please select a feedstuff';
        }

        if (this.isEmpty(item.minimum)) {
            return 'Please enter a minimum value';
        }

        if (this.isEmpty(item.maximum)) {
            return 'Please enter a maximum value';
        }

        if (this.isEmpty(item.cost)) {
            return 'Please enter a cost';
        }

        return null;
    }

    private isEmpty(value): boolean {
        return typeof value === 'string' && !value.trim() || typeof value === 'undefined' || value === null;
    }

    private loadFormulaList(): void {
        this.mainService.formulaService.listFormulas().subscribe((result: any[]) => {
            this.formulas = result;
        }, (error: Error) => {
            console.error(error);
        });

        this.formulasDataSource = Observable
            .create((observer: any) => {
                // Runs on every search
                observer.next(this.selectedFormulaName);
            })
            .mergeMap((token: string) => this.queryFormulaList(token));
    }

    private loadFeedstuffList(): void {
        this.mainService.feedstuffService.listFeedstuffs().subscribe((result: Feedstuff[]) => {
            this.feedstuffs = result;
        }, (error: Error) => {
            console.error(error);
        });
    }

    private initializeCurrencyControl(): void {
        this.currencies = [
            'USD',
            'ZAR',
        ];

        this.selectedCurrencies = ['USD'];
    }

}