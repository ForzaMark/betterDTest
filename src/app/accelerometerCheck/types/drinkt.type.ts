export class Drink{

    constructor(public name: string, public percentage: number){}
    toString() {
        return this.name + ' | ' + this.percentage + '%';
    }
}