import { Combination } from './Combination.mjs'

export class RandomCombination extends Combination {

    constructor(){
        super();
    }

    accept(visitor){}

    setCombination(){
        for (let i = 0; i < this.getLength(); i++) {
            let uniqueColor;
             do {
                let randomColor = this.getRandomColor();
                let originalValue = this.getValue();
                this.setValue(originalValue + randomColor);
                uniqueColor = this.validateUniqueColors();
                if (!uniqueColor) {
                    this.setValue(originalValue);
                }
            } while (!uniqueColor);
        }
    }
}