// Imports
import { Observable } from 'rxjs/Observable';

// Imports services
import { MainService } from './../services/main.service';

// Imports models
import { Feedstuff } from './../models/feedstuff';
import { FormulationFeedstuff } from './../models/formulation-feedstuff';
import { Formulation } from './../models/formulation';
import { Formula } from './../models/formula';
import { TreeNode } from './../models/tree-node';
import { FormulationResult } from './../models/formulation-result';

export class FormulatorViewModel {
    public formulaTreeNodes: TreeNode[];

    public feedstuffs: Feedstuff[] = [];
    public feedstuffTreeNodes: TreeNode[] = [];

    public validationMessages: string[] = [];

    public currencies: string[] = [];

    public isFormulating: boolean = false;

    public formulation: Formulation = new Formulation(null, null, null, 'ZAR', null, null, null, null, null, null, null);
    public formulatorResult: FormulationResult = null;

    constructor(private mainService: MainService) {
        this.initializeCurrencyControl();
        this.loadFeedstuffList();
        this.loadFormulaList();
        this.onClick_ResetToDefaults();
    }

    private loadFormulaList(): void {
        this.mainService.formulaService.listFormulaTreeNodes().subscribe((result: TreeNode[]) => {
            this.formulaTreeNodes = result;
        }, (error: Error) => {
            console.error(error);
        });
    }

    public onSelect_Currency(selectedCurrency: string): void {
        this.formulation.currencyCode = selectedCurrency;
    }

    public onSelect_Feedstuff(item: FormulationFeedstuff): void {
        if (item && this.formulation.formula) {
            item.isLoading = true;
            this.mainService.feedstuffService.findSuggestedValues(this.formulation.formula.id, item.id).subscribe((result: any) => {
                if (result !== null) {
                    item.minimum = result.minimum;
                    item.maximum = result.maximum;
                }
                item.isLoading = false;

                this.validateFormulation();
            });
        }
    }

    public onSelect_Formula(event: any): void {
        if (event.node.data.children === undefined) {
            this.formulation.formula = new Formula(event.node.data.id, event.node.data.name, null, null, null);
            for (const feedstuff of this.formulation.feedstuffs) {
                this.onSelect_Feedstuff(feedstuff);
            }
        }
    }

    public onClick_AddFeedstuff(): void {
        this.formulation.feedstuffs.push(new FormulationFeedstuff(null, null, null, null, null, null, 0, 1000, null));
    }

    public onClick_RemoveFeedstuff(item: FormulationFeedstuff): void {
        this.formulation.feedstuffs.splice(this.formulation.feedstuffs.indexOf(item), 1);
    }

    public onClick_ResetToDefaults(): void {
        this.mainService.feedstuffService.listExampleFeedstuffs().subscribe((result: FormulationFeedstuff[]) => {
            this.formulation.feedstuffs = result;
        }, (error: Error) => {
            console.error(error);
        });
    }

    public onClick_Formulate(): void {
        this.formulatorResult = null;

        if (!this.validateFormulation()) {
            return;
        }

        this.isFormulating = true;
        const feedstuffs: any[] = [];
        for (const feedstuff of this.formulation.feedstuffs) {
            if (feedstuff.id != null) {
                feedstuffs.push({
                    cost: feedstuff.cost,
                    id: feedstuff.id,
                    maximum: feedstuff.maximum,
                    minimum: feedstuff.minimum,
                });
            }
        }
        const obj = {
            currencyCode: this.formulation.currencyCode,
            feedstuffs: this.formulation.feedstuffs.map((x) => {
                return {
                    id: x.id,
                    minimum: x.minimum,
                    maximum: x.maximum,
                    cost: x.cost
                };
            }),
            formulaId: this.formulation.formula.id,
        };

        this.mainService.formulatorService.formulate(obj).subscribe((result: FormulationResult) => {
            this.formulatorResult = result;
            this.isFormulating = false;
        }, (error: Error) => {
            console.error(error);
            this.isFormulating = false;
        });

    }

    private validateFormulation(): boolean {
        this.validationMessages = [];

        if (this.formulation.formula === null) {
            this.validationMessages.push('Please select a formula');
        }

        for (const feedstuff of this.formulation.feedstuffs) {
            if (feedstuff.id !== null && this.formulation.feedstuffs.filter((x) => x.id != null && x.id === feedstuff.id).length > 1) {
                const f = this.feedstuffs.find((x => x.id === feedstuff.id));
                this.validationMessages.push(`${f.name} cannot appear twice in the feedstuffs list`);
            }
        }

        if (this.validationMessages.length > 0) {
            return false;
        }

        return true;
    }

    private isEmpty(value): boolean {
        return typeof value === 'string' && !value.trim() || typeof value === 'undefined' || value === null;
    }

    private loadFeedstuffList(): void {
        this.mainService.feedstuffService.listFeedstuffs().subscribe((result: Feedstuff[]) => {
            this.feedstuffs = result;
            
            for (const feedstuff of this.feedstuffs) {
                let n: TreeNode = feedstuff.group === null? this.feedstuffTreeNodes.find((x) => x.id === 'user') : this.feedstuffTreeNodes.find((x) => x.id === feedstuff.group.id);
                
                if (!n) {
                    n = new TreeNode(
                        feedstuff.group === null? 'user' : feedstuff.group.id,
                        feedstuff.group === null? 'User' : feedstuff.group.name,
                        [
                            new TreeNode(feedstuff.id, feedstuff.name, null)
                        ]
                    );

                    this.feedstuffTreeNodes.push(n);
                }
                else {
                    n.children.push(new TreeNode(feedstuff.id, feedstuff.name, null));
                }
                
            }
        }, (error: Error) => {
            console.error(error);
        });
    }

    private initializeCurrencyControl(): void {
        this.currencies = [
            'USD',
            'ZAR',
        ];
    }

}