// Imports
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

// imports services
import { FeedstuffService } from '../services/feedstuff.service';
import { FormulaService } from '../services/formula.service';
import { FormulatorService } from '../services/formulator.service';

// Imports models
import { Feedstuff } from './../models/feedstuff';
import { Formula } from './../models/formula';

@Component({
  selector: 'app-formulator',
  styleUrls: ['./formulator.component.css'],
  templateUrl: './formulator.component.html',
})
export class FormulatorComponent implements OnInit {

  public formulaList: Formula[] = [];
  public formulaListDataSource: Observable<any> = null;
  public selectedFormulaName: string;
  public selectedFormula: Formula = null;

  public feedstuffList: Feedstuff[] = [];

  public currencyList: string[] = [];
  public selectedCurrencyNames: string[];

  public errorMessage: string = null;
  public isFormulating: boolean = false;

  public feedstuffs: any[] = [];
  public formulatorResult: any = null;

  constructor(private feedstuffService: FeedstuffService, private formulaService: FormulaService, private formulatorService: FormulatorService) { }

  public ngOnInit() {

    this.initializeCurrencyControl();
    this.loadFeedstuffList();
    this.loadFormulaList();
    this.onClick_ResetToDefaults();
  }

  public getFormulaListAsDataSource(token: string): Observable<any> {

    return Observable.of(
      this.formulaList.filter((item: any) => {
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
    this.selectedCurrencyNames = [selectedCurrency.id];
  }

 public onUpdate_SuggestedValues(item: any, instance: any): void {
    if (item.item !== null) {
      instance.selectedFeedstuff = item.item;
      instance.selectedFeedstuffName = item.item.name;
    }

    if (item.item !== null && this.selectedFormula !== null) {
      instance.isLoading = true;
      this.feedstuffService.findSuggestedValues(this.selectedFormula.id, instance.selectedFeedstuff.id).subscribe((result: any) => {
        if (result !== null) {
          instance.minimum = result.minimum;
          instance.maximum = result.maximum;
        }
        instance.isLoading = false;

        this.updateFeedstuffErrorMessages();
      });
    }
  }

  public onSelect_Formula(item: any): void {
    this.selectedFormula = item.item;
    for (const feedstuff of this.feedstuffs) {
      this.onUpdate_SuggestedValues({
        item: feedstuff.selectedFeedstuff,
      }, feedstuff);
    }
  }

  public onClick_AddFeedstuff(): void {
    this.feedstuffs.push({
      cost: null,
      isLoading: false,
      maximum: 1000,
      minimum: 0,
      selectedFeedstuff: null,
      selectedFeedstuffName: null,
    });
  }

  public onClick_RemoveFeedstuff(item: any): void {
    this.feedstuffs.splice(this.feedstuffs.indexOf(item), 1);
  }

  public onClick_ResetToDefaults(): void {
    this.feedstuffService.listExampleFeedstuffs().subscribe((result: any[]) => {
      this.feedstuffs = result;
    }, (error: Error) => {
      this.errorMessage = 'An error has occurred while loading example feedstuff';
    });
  }

  public onClick_Formulate(): void {
    this.formulatorResult = null;
    if (this.selectedFormula === null) {
      this.errorMessage = 'Please select a formula';
    } else {

      let isValid = true;

      this.updateFeedstuffErrorMessages();

      for (const feedstuff of this.feedstuffs) {

        if (feedstuff.errorMessage !== null) {
          isValid = false;
        }

        if (feedstuff.selectedFeedstuff !== null && this.feedstuffs.filter((x) => x.selectedFeedstuff != null && x.selectedFeedstuff.id === feedstuff.selectedFeedstuff.id).length > 1) {
          this.errorMessage = 'Cannot have duplicate feedstuffs';
          isValid = false;
        }
      }

      if (!isValid) {
        return;
      }

      this.isFormulating = true;
      this.errorMessage = null;
      const feedstuffs: any[] = [];
      for (const feedstuff of this.feedstuffs) {
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
        currencyCode: this.selectedCurrencyNames[0],
        feedstuffs,
        formulaId: this.selectedFormula.id,
      };

      this.formulatorService.formulate(obj).subscribe((result: any) => {
        this.formulatorResult = result;
        this.isFormulating = false;
      }, (error: Error) => {
        this.errorMessage = 'An error has occurred while formulating';
        this.isFormulating = false;
      });
    }
  }

  private updateFeedstuffErrorMessages(): void {
    for (const feedstuff of this.feedstuffs) {
      feedstuff.errorMessage = this.validateFeedstuff(feedstuff);
      if (feedstuff.selectedFeedstuff !== null && this.feedstuffs.filter((x) => x.selectedFeedstuff !== null && x.selectedFeedstuff.id === feedstuff.selectedFeedstuff.id).length > 1) {
        this.errorMessage = 'Cannot have duplicate feedstuffs';
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
    this.formulaService.listFormulas().subscribe((result: any[]) => {
      this.formulaList = result;
    }, (error: Error) => {
      this.errorMessage = 'An error has occurred while loading formulas';
    });

    this.formulaListDataSource = Observable
      .create((observer: any) => {
        // Runs on every search
        observer.next(this.selectedFormulaName);
      })
      .mergeMap((token: string) => this.getFormulaListAsDataSource(token));
  }

  private loadFeedstuffList(): void {
    this.feedstuffService.listFeedstuffs().subscribe((result: Feedstuff[]) => {
      this.feedstuffList = result;
    }, (error: Error) => {
      this.errorMessage = 'An error has occurred while loading feedstuff';
    });
  }

  private initializeCurrencyControl(): void {
    this.currencyList = [
      'USD',
      'ZAR',
    ];

    this.selectedCurrencyNames = ['USD'];
  }

}
