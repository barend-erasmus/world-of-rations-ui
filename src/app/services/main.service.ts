// Imports
import { Injectable } from '@angular/core';

// Imports services
import { FeedstuffService } from './feedstuff.service';
import { FormulaService } from './formula.service';
import { FormulatorService } from './formulator.service';

@Injectable()
export class MainService {

    constructor(public feedstuffService: FeedstuffService, public formulaService: FormulaService, public formulatorService: FormulatorService) {

    }
}
