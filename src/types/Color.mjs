export class Color {
    static RED = new Color(`red`);
    static GREEN = new Color(`green`);
    static YELLOW = new Color(`yellow`);
    static BLUE = new Color(`blue`);
    static MAGENTA = new Color(`magenta`);
    static CHESTNUT = new Color(`chestnut`);
    static NULL = new Color(` `);

    #string;

    constructor(string) {
        this.#string = string;
    }

    static values() {
        return [Color.RED,
            Color.GREEN,
            Color.YELLOW,
            Color.BLUE,
            Color.MAGENTA,
            Color.CHESTNUT,
        ];
    }
    
    static get(ordinal) {
        return Color.values()[ordinal];
    }

    static getRandomColor(){
        return Color.values()[parseInt(Math.random() * Color.values().length)];
    }

    static validateColorCode(colorCode){
        for (let i = 0; i < Color.values().length; i++) {
            if (Color.values()[i].getCode() === colorCode) {
                return true;
            }
        }
        return false;
    }

    static colorsCodeToString(){
        let colors = "";
        for (let i = 0; i < Color.values().length; i++) {
            colors += Color.values()[i].getCode();
        }
        return colors;
    }

    getCode(){
        return this.#string[0];
    }

}    