import { Combination } from './Combination.mjs'
import { Color } from '../types/Color.mjs'
import { Result } from './Result.mjs'

export class MinimaxProposedCombination extends Combination {
    //DonaldKnuth algorithm
    #impossibleCombination
    #possibleCombination

    constructor(){
        super();
        this.#possibleCombination = MinimaxProposedCombination.getAllCombinations();
        this.#impossibleCombination = [];
    }

    accept(visitor){
        visitor.visitMinimaxSecretCombination();
    }

    setCombination(){
        let minimumEliminated = -1;
        let bestGuess = "";
        let unused = [];
        unused.push.apply(unused, this.#possibleCombination);
        unused.push.apply(unused, this.#impossibleCombination);
        //console.log("unused: ", unused.length, ", possible: ", this.#possibleCombination.length, ", impossible: ", this.#impossibleCombination.length);
        for (const combinationA of unused) {
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
        this.setValue(bestGuess);
    }

    #getInitialMinMaxTable(){
        let minMaxTable = [];
        for(let i=0; i <= Combination.COMBINATION_LENGTH; i++){
            minMaxTable[i] = [];
            for(let j=0; j <= Combination.COMBINATION_LENGTH; j++){
                minMaxTable[i][j] = 0;
            }
        }
        return minMaxTable;
    }

    setResult(result){
        //console.log("set minimax setCombination bestGuess: ",
        //     this.getValue(),
        //     "blacks: ", result.getBlacks(),
        //     "whites: ", result.getWhites());
        for(let i=0; i < this.#possibleCombination.length; i++){
            const combinationResult = Result.checkBlacksAndWhites(this.getValue(), this.#possibleCombination[i]);
            if(!combinationResult.equals(result)){
                // console.log("remove: ",
                // this.#possibleCombination[i],
                // "blacks: ", combinationResult.getBlacks(),
                // "whites: ", combinationResult.getWhites() );
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
                    getPermutations(elements, actual + elements[i], quantity-1);
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
        return clone;
    }
}