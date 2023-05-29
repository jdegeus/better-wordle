import { WORD_LIST } from "../../../public/words_en";

export default class Wordle {

    constructor() {
        this.answer = null;
        this.guesses = [];

        this.charStatus = Object.fromEntries(
            Array.from("qwertyuiopasdfghjklzxcvbnm").map(char => [
                char, {
                    char,
                    status: null
                }
            ])
        );
    }

    setRandomAnswer() {
        this.answer = Array.from(WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)])
    }

    setAnswer(string) {
        return this.answer = Array.from(string);
    }

    getAnswer() {
        return this.answer;
    }

    getAnswerToString() {
        if(!this.answer) return null;
        return this.answer.join("");
    }

    getCharStatus() {
        return this.charStatus;
    }
    
    updateCharStatus(){
        for(const guess of this.guesses){
            for(const pos of guess) {
                if(this.charStatus[pos.char].status === "CORRECT_SPOT") continue;
                if(pos.result === "WRONG_SPOT_EXTRA") continue;
                this.charStatus[pos.char].status = pos.result;
            }
        }
    }

    getGuesses() {
        return this.guesses;
    }

    /**
     * This function compares the solution word and a guess.
     * Returning an array with with feedback for each character. 
     * 
     * @param {Array} guess: Array containing the characters of the guess
     * @return {String} Feedback 'WIN', 'NON_EXISTENT', 'WRONG_SPOT' or 'CORRECT_SPOT'.
     */
    makeGuess(guess) {

        const guessString = guess.join("");
        const answerString = this.getAnswerToString();

        if (!WORD_LIST.includes(guessString.toLowerCase())) {
            return 'NON_EXISTENT';
        }

        const attempt = this.createAttempt(guess);
        this.guesses.push(attempt);
        this.updateCharStatus();

        if (guessString === answerString) {
            return 'WIN';
        }

        return 'GUESS';
    }

    createAttempt(guess){

        // Check if characters are included in the word and if on correct spot.
        const attempt = guess.map((input, index) => {
            const answer = this.answer[index].toLowerCase();
            const char = input.toLowerCase();
            return {
                index,
                answer,
                char,

                // Set char as CORRECT_SPOT if guess char matches with answer char
                result: answer === char ? "CORRECT_SPOT" :

                // If it does not match, set as NO_SPOT if char is not in answer, else set as WRONG_SPOT
                this.answer.includes(char) ? "WRONG_SPOT" : "NO_SPOT",
            }
        });

        // Check characters that are included, but on wrong spot.
        for (let i = 0; i < attempt.length; i++) {

            // If char has WRONG_SPOT set
            if (attempt[i].result === "WRONG_SPOT") {
                // Make array of same char that are part of the answer
                const sameAnswerChars = attempt.filter(item => item.answer === attempt[i].char);
                
                // Make array of same char that are part of the guess
                const sameGuessChars = attempt.filter(item => item.char === attempt[i].char);

                // Make array of all same char that are already correct.
                const sameCorrectChars = sameAnswerChars.filter(item => item.result === "CORRECT_SPOT");

                // If this char only appears once in the guess, WRONG_SPOT is for sure correct
                if(sameGuessChars.length === 1){
                    continue;
                }

                // If the amount of same type char in the guess is less than amount of chars in the answer
                if(sameGuessChars.length <= sameAnswerChars.length){
                    continue;
                }

                // If it is greater or equal, every char's index that exceeds the length of the same 
                // chars array of the answer, is an WRONG_SPOT_EXTRA
                if(attempt[i].index >= sameGuessChars[sameAnswerChars.length - sameCorrectChars.length].index){
                    attempt[i].result = "WRONG_SPOT_EXTRA";
                }
            }
        }

        return attempt;
    }

}