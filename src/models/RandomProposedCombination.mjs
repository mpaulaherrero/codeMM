import { RandomCombination } from './RandomCombination.mjs'

export class RandomProposedCombination extends RandomCombination {

    constructor(){
        super();
    }

    accept(visitor){
        visitor.visitRandomProposedCombination();
    }

    clone(){
        const clone = new RandomProposedCombination();
        clone.setValue(this.getValue());
        return clone;
    }
}