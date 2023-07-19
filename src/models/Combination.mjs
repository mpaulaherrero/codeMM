import { Color } from '../types/Color.mjs'

export class Combination {
    COMBINATION_LENGTH = 4;

    #value

    constructor(){
        this.#value = "";
    }

    getLength(){
        return this.COMBINATION_LENGTH;
    }

    setValue(value){
        this.#value=value;
    }

    getValue(){
        return this.#value;
    }

    validateLength(){
        return this.COMBINATION_LENGTH !== this.#value.length;
    }

    validateColors() {
        let validColor = true;
        for (let i = 0; validColor && i < this.#value.length; i++) {
          validColor = Color.validateColorCode(this.#value[i]);
        }
        return validColor;
    }

    validateUniqueColors() {
        let uniqueColor = true;
        for (let i = 0; uniqueColor && i < this.#value.length; i++) {
          for (let j = i + 1; uniqueColor && j < this.#value.length; j++) {
            uniqueColor = this.#value[j] !== this.#value[i];
          }
        }
        return uniqueColor;
    }

    hasColor(color){
        for (let i = 0; i < this.#value.length; i++) {
            if (this.#value[i] === color) {
              return true;
            }
        }
        return false;
    }

    getRandomColor(){
        return Color.getRandomColor().getCode();
    }
}