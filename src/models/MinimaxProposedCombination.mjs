import { Combination } from './Combination.mjs'
import { Color } from '../types/Color.mjs'
import { Result } from './Result.mjs'

export class MinimaxProposedCombination extends Combination {
    //DonaldKnuth algorithm
    static allCombination = MinimaxProposedCombination.getAllCombinations();

    #impossibleCombination
    #possibleCombination

    constructor(){
        super();
        this.#possibleCombination = MinimaxProposedCombination.getAllCombinations();
        this.#impossibleCombination = [];
        //console.log('create MinimaxProposedCombination', this.#possibleCombination.length);
    }

    accept(visitor){
        visitor.visitMinimaxSecretCombination();
    }

    setCombination(){
        let minimumEliminated = -1;
        let bestGuess = "";
        for (const combinationA of this.#possibleCombination) {
            let minMaxTable = this.#getInitialMinMaxTable();
            for (const combinationB of this.#possibleCombination) {
                let result = Result.checkBlacksAndWhites(combinationA, combinationB);
                minMaxTable[result.getBlacks()][result.getWhites()]++;
            }
            let mostHits = -1;
            for (let row of minMaxTable) {
                for (let num of row) {
                    mostHits = Math.max(num, mostHits);
                }
            }
            let score = this.#possibleCombination.length - mostHits;
            if (score > minimumEliminated) {
                minimumEliminated = score;
                bestGuess = combinationA;
            }
        }
        //console.log("set minimax setCombination bestGuess: ", bestGuess);
        this.setValue(bestGuess);
    }

    #getInitialMinMaxTable(){
        let minMaxTable = [];
        for(let i=0; i < Combination.COMBINATION_LENGTH +1; i++){
            minMaxTable[i] = [];
            for(let j=0; j < Combination.COMBINATION_LENGTH +1; j++){
                minMaxTable[i][j] = 0;
            }
        }
        return minMaxTable;
    }

    setResult(result){
        //console.log("set minimax setResult blacks: ", result.getBlacks(), ", whites: ", result.getWhites());
        for(let i=0; i < this.#possibleCombination.length; i++){
            const combinationResult = Result.checkBlacksAndWhites(this.getValue(), this.#possibleCombination[i]);
            if(!combinationResult.equals(result)){
                this.#impossibleCombination.push(this.#possibleCombination[i]);
                this.#possibleCombination.splice(i,1);
            }
        }
    }

    static getAllCombinations() {
        function getPermutations(elements, actual, quantity) {
            if(quantity==0) {
                   allCombination.push(actual)
            } else {
                for(let i=0; i<elements.length; i++) {
                    if(control[i]==true) continue;
                    control[i]=true;
                    getPermutations(elements, actual + elements[i], quantity-1, control);
                    control[i]=false;
                }
            }
       }

       const colors = Color.colorsCodeToString().split("");
       let control = [];
       let allCombination = [];
       getPermutations(colors, "", Combination.COMBINATION_LENGTH);
       return allCombination;
    }

    clone(){
        const clone = new MinimaxProposedCombination();
        clone.setValue(this.getValue());
        clone.#impossibleCombination = this.#impossibleCombination;
        clone.#possibleCombination = this.#possibleCombination;
        //console.log('clone MinimaxProposedCombination possibleCombination: ', clone.#impossibleCombination.length);
        //console.log('clone MinimaxProposedCombination impossibleCombination: ', clone.#possibleCombination.length);
        return clone;
    }
}