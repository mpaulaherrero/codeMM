import { UserCombination } from './UserCombination.mjs'

export class UserProposedCombination extends UserCombination {

    constructor(){
        super();
    }

    accept(visitor){
        visitor.visitUserProposedCombination();
    }

    clone(){
        const clone = new UserProposedCombination();
        clone.setValue(this.getValue());
        return clone;
    }
}