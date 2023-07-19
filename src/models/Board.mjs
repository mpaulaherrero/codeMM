import { RandomSecretCombination } from './RandomSecretCombination.mjs'
import { RandomProposedCombination } from './RandomProposedCombination.mjs'
import { UserSecretCombination } from './UserSecretCombination.mjs'
import { UserProposedCombination } from './UserProposedCombination.mjs'
import { Result } from './Result.mjs'

export class Board {

    MAX_ATTEMPTS = 10;

    #secretCombination
    #proposedCombination
    #proposedCombinations
    #results

    constructor(numOfPlayers){
        this.#proposedCombinations = [];
        this.#results = [];

        switch(numOfPlayers){
            case 0:
                this.#secretCombination = new RandomSecretCombination();
                this.#proposedCombination = new RandomProposedCombination();
                break;
            case 1:
                this.#secretCombination = new RandomSecretCombination();
                this.#proposedCombination = new UserProposedCombination();
                break;
            default:
                this.#secretCombination = new UserSecretCombination();
                this.#proposedCombination = new UserProposedCombination();
        }
    }

    getSecretCombination(){
        return this.#secretCombination;
    }

    newLastProposedCombination(){
        this.#proposedCombinations[this.#proposedCombinations.length] = this.#proposedCombination.clone();
    }

    getLastProposedCombination(){
        return this.#proposedCombinations[this.getProposedCombinationsLength()-1];
    }

    getProposedCombination(position){
        return this.#proposedCombinations[position];
    }

    getProposedCombinationsLength(){
        return this.#proposedCombinations.length;
    }

    getResult(position){
        return this.#results[position];
    }

    checkBlacksAndWhites(){
        const result = new Result();
        for (let i = 0; i < this.#secretCombination.getLength(); i++) {
            if (this.#secretCombination.getValue()[i] === this.getLastProposedCombination().getValue()[i]) {
                result.addBlacks();
            } else {
                if (this.#secretCombination.hasColor(this.getLastProposedCombination().getValue()[i])) {
                    result.addWhites();
                }
            }
        }
        result.setWinner(this.#secretCombination.getLength());
        this.#results[this.#results.length] = result;
    }

    isLastProposedCombinationAWinner(){
        return this.#results[this.#results.length-1].isWinner();
    }

    isComplete(){
        return this.getProposedCombinationsLength() === this.MAX_ATTEMPTS;
    }
}