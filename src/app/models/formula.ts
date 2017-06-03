// Imports models
import { FormulaElement } from './formula-element';
import { FormulaGroup } from './formula-group';

export class Formula {

    public static mapFormula(obj: any) {
        return new Formula(obj.id, obj.name, obj.group === null ? null : FormulaGroup.mapFormulaGroup(obj.group), obj.elements.map((x) => new FormulaElement(x.id, x.name, x.unit, x.sortOrder, x.minimum, x.maximum)), obj.comparisonFormulaId);
    }

    constructor(
        public id: string,
        public name: string,
        public group: FormulaGroup,
        public elements: FormulaElement[],
        public comparisonFormulaId: string,
    ) {

    }

    public getFormulaGroup(level: number): FormulaGroup {
        const groups: FormulaGroup[] = [];

        let group = this.group;
        while(group !== null) {
            groups.push(group);
            group = group.parent;
        }

        return groups[groups.length - level - 1];
    }

    public getNumberOfFormulaGroups(): number {
        const groups: FormulaGroup[] = [];

        let group = this.group;
        while(group !== null) {
            groups.push(group);
            group = group.parent;
        }

        return groups.length;
    }
}
