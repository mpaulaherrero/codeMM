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
}