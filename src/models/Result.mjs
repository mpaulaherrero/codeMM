export class Result {
    #blacks
    #whites
    #isWinner

    constructor(){
        this.#blacks = 0;
        this.#whites = 0;
        this.#isWinner = false;
    }

    addWhites(){
        this.#whites++;
    }

    addBlacks(){
        this.#blacks++;
    }

    getBlacks(){
        return this.#blacks;
    }

    getWhites(){
        return this.#whites;
    }

    setWinner(combinationLength){
        this.#isWinner = this.#blacks === combinationLength;
    }

    isWinner(){
        return this.#isWinner;
    }

    equal(result){
        let equal = false;
        if(this.#blacks==result.#blacks && this.#whites==result.#whites){
            equal = true;
        }
        return equal;
    }

    static checkBlacksAndWhites(secretCombination, combination){
        const result = new Result();
        for (let i = 0; i < secretCombination.length; i++) {
            if (secretCombination[i] === combination[i]) {
                result.addBlacks();
            } else {
                if (Result.hasColor(secretCombination,combination[i])) {
                    result.addWhites();
                }
            }
        }
        result.setWinner(secretCombination.length);
        return result;
    }

    static hasColor(combination, color){
        for (let i = 0; i < combination.length; i++) {
            if (combination[i] === color) {
              return true;
            }
        }
        return false;
    }
}