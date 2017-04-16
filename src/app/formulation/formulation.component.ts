// Imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// Imports services
import { FormulatorService } from '../services/formulator.service';

// Imports models
import { Element } from './../models/element';
import { Feedstuff } from './../models/feedstuff';
import { Formulation } from './../models/formulation';

@Component({
  selector: 'app-formulation',
  templateUrl: './formulation.component.html',
})
export class FormulationComponent implements OnInit {

  public formulation: Formulation;

  public totalWeightOfFeedstuffInFormulation: string;
  public totalCostOfFeedstuffInFormulation: string;
  public totalWeightOfSupplementFeedstuffInFormulation: number;

  constructor(private activatedRoute: ActivatedRoute, private formulatorService: FormulatorService) { }

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params): void => {
      const formulationId = params['formulationId'];
      this.formulatorService.findFormulation(formulationId).subscribe((formulation: Formulation): void => {
        formulation.feedstuffs.sort((a: Feedstuff, b: Feedstuff) => {
          return (b.weight < a.weight) ? -1 : 1;
        });
        formulation.composition.sort((a: Element, b: Element) => {
          return (a.sortOrder < b.sortOrder) ? -1 : 1;
        });

        formulation.feedstuffs = formulation.feedstuffs.filter((x) => x.weight !== 0);

        this.formulation = formulation;
        this.updateTotals();
      });
    });
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
    return this.formulation.supplementComposition.map((x) => x.selectedSupplementFeedstuffs[0] === undefined ? 0 : x.selectedSupplementFeedstuffs[0].weight).reduce((a, b) => a + b, 0);
  }
}
