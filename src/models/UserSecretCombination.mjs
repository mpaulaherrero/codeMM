import { UserCombination } from './UserCombination.mjs'

export class UserSecretCombination extends UserCombination {

    constructor(){
        super();
    }

    accept(visitor){
        visitor.visitUserSecretCombination();
    }
}