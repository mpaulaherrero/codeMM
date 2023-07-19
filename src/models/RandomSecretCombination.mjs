import { RandomCombination } from './RandomCombination.mjs'

export class RandomSecretCombination extends RandomCombination {

    constructor(){
        super();
    }

    accept(visitor){
        visitor.visitRandomSecretCombination();
    }

}