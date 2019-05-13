export class Drink {
    constructor(public name: string, public percentage: number, public mililiter: number) {}
    toString() {
        return this.name + ' | ' + this.percentage + '%' + ' | ' + this.mililiter + ' ml';
    }
}
