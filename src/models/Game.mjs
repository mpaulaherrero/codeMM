import { Board } from './Board.mjs'

export class Game {

    static STATES = { PLAYER_LOOSE: 0, PLAYER_WIN: 1, PLAYER_IN_GAME: 2 };

    #board
    #state

    constructor(numPlayers){
        this.#board = new Board(numPlayers);
        this.#state = Game.STATES.PLAYER_IN_GAME;
    }

    getBoard(){
        return this.#board;
    }

    checkEnd(){
        if (this.#board.isLastProposedCombinationAWinner()) {
            this.#state = Game.STATES.PLAYER_WIN
        } else if (this.#board.isComplete()) {
            this.#state  = Game.STATES.PLAYER_LOOSE;
        } else{
            this.#state = Game.STATES.PLAYER_IN_GAME;
        }
        return this.#state !== Game.STATES.PLAYER_IN_GAME;
    }

    getState(){
        return this.#state;
    }

    checkBlacksAndWhites(){
        this.getBoard().checkBlacksAndWhites();
    }
}