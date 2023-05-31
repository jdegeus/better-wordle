import styles from './styles.module.css';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import ControlBar from '../app/controlbar/controlbar';
import Keyboard from '../app/keyboard/keyboard';
import Board from '../app/board/board';
import Message from '../app/message/message';
import Definition from '../app/definition/definition';

import { WORD_LIST } from '../../public/words_en';
const SPECIAL_CHAR_REGEX = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

export default function HomePage() {
  const pageRef = useRef();
  const router = useRouter();

  const [answer, setAnswer] = useState(null);
  const [cursorIndex, setCursorIndex] = useState(0);
  const [guess, setGuess] = useState(new Array(5).fill(null));
  const [guesses, setGuesses] = useState([]);
  const [charStatus, setCharStatus] = useState(Object.fromEntries(
    Array.from("qwertyuiopasdfghjklzxcvbnm").map(char => [
      char, {
        char,
        status: null
      }
    ])
  ));

  const [hasWon, setHasWon] = useState(false);
  const [isDefinitionOpen, setIsDefinitionOpen] = useState(false);
  const [message, setMessage] = useState(null);


  function handleKey(key) {

    if (key.toLowerCase() === "escape") {
      setIsDefinitionOpen(false);
    }

    if (hasWon) return;
    setMessage(null);

    if (key.toLowerCase() === "enter") {
      if (cursorIndex === answer?.length - 1 && guess[cursorIndex] !== null) {
        const response = makeGuess();
        if (response === 'WIN') {
          resetInput();
          setMessage({ content: 'You got it!', type: 'SUCCESS' });
          setHasWon(true);
          return;
        }

        if (response === 'NON_EXISTENT') {
          setMessage({ content: 'Word does not exist.', type: 'ERROR' });
          return;
        }

        resetInput();
      } else {
        setMessage(null);
      }
    }

    if (key.toLowerCase() === "backspace" || key.toLowerCase() === "del") {
      deleteChar();
    }

    if (key.length === 1) {
      addChar(key);
    }
  }

  function handleKeyClick(key) {
    handleKey(key);
  }

  function handleKeyDown(e) {
    const key = e.key;

    if (SPECIAL_CHAR_REGEX.test(key)) {
      // possibly shake screen
      return;
    }

    if (!isNaN(parseInt(key))) {
      // possibly shake screen
      return;
    }

    if (key === " ") {
      // possibly shake screen
      return;
    }

    handleKey(key);
  }

  function deleteChar() {
    setGuess(() => {
      const newGuess = [...guess];
      let newIndex = cursorIndex;
      if (newGuess[cursorIndex] === null) {
        newIndex = Math.max(cursorIndex - 1, 0);
      }
      newGuess[newIndex] = null;
      setCursorIndex(newIndex);
      return newGuess;
    });
  }

  function addChar(char) {
    setGuess(() => {
      const newGuess = [...guess];
      if (newGuess[cursorIndex] !== null) {
        return guess;
      }
      newGuess[cursorIndex] = char;
      setCursorIndex(Math.min(cursorIndex + 1, guess.length - 1));
      return newGuess;
    });
  }

  function resetInput() {
    setGuess(new Array(answer?.length).fill(null));
    setCursorIndex(0);
  }

  function updateCharStatus() {
    const newCharStatus = { ...charStatus };
    for (const guess of guesses) {
      for (const pos of guess) {
        if (newCharStatus[pos.char].status === "CORRECT_SPOT") continue;
        if (pos.result === "WRONG_SPOT_EXTRA") continue;
        newCharStatus[pos.char].status = pos.result;
      }
    }
    setCharStatus(newCharStatus);
  }

  /**
   * This function compares the solution word and a guess.
   * Returning an array with with feedback for each character. 
   * 
   * @param {Array} guess: Array containing the characters of the guess
   * @return {String} Feedback 'WIN', 'NON_EXISTENT', 'WRONG_SPOT' or 'CORRECT_SPOT'.
   */
  function makeGuess() {

    const guessString = guess.join("");
    const answerString = answer.join("");

    if (!WORD_LIST.includes(guessString.toLowerCase())) {
      return 'NON_EXISTENT';
    }

    const attempt = createAttempt();

    setGuesses(() => {
      const newGuesses = [...guesses];
      newGuesses.push(attempt);
      return newGuesses;
    });

    updateCharStatus();

    if (guessString === answerString) {
      return 'WIN';
    }

    return 'GUESS';
  }

  function createAttempt() {

    // Check if characters are included in the word and if on correct spot.
    const attempt = guess.map((input, index) => {
      const answerChar = answer[index].toLowerCase();
      const char = input.toLowerCase();
      return {
        index,
        answer: answerChar,
        char,

        // Set char as CORRECT_SPOT if guess char matches with answer char
        result: answerChar === char ? "CORRECT_SPOT" :

          // If it does not match, set as NO_SPOT if char is not in answer, else set as WRONG_SPOT
          answer.includes(char) ? "WRONG_SPOT" : "NO_SPOT",
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
        if (sameGuessChars.length === 1) {
          continue;
        }

        // If the amount of same type char in the guess is less than amount of chars in the answer
        if (sameGuessChars.length <= sameAnswerChars.length) {
          continue;
        }

        // If it is greater or equal, every char's index that exceeds the length of the same 
        // chars array of the answer, is an WRONG_SPOT_EXTRA
        if (attempt[i].index >= sameGuessChars[sameAnswerChars.length - sameCorrectChars.length].index) {
          attempt[i].result = "WRONG_SPOT_EXTRA";
        }
      }
    }

    return attempt;
  }

  function handleGetNewWord() {
    setAnswer(null);
    setCursorIndex(0);
    setGuess(new Array(5).fill(null));
    setGuesses([]);
    setCharStatus(Object.fromEntries(
      Array.from("qwertyuiopasdfghjklzxcvbnm").map(char => [
        char, {
          char,
          status: null
        }
      ])
    ));
    setHasWon(false);
    setIsDefinitionOpen(false);
    setMessage(null);
  }

  useEffect(() => {
    if (router.query?.word) {
      setAnswer(Array.from(router.query?.word));
    }
  }, [router.query.word]);

  useEffect(() => {
    if (!answer) {
      if (router.query?.word) {
        setAnswer(Array.from(router.query?.word));
      } else {
        setAnswer(Array.from(WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]));
      }
    }
    pageRef.current.focus();
  }, [answer]);

  useEffect(() => {
    updateCharStatus();
  }, [guesses]);

  return (
    <div tabIndex="1" id={styles.page} onKeyDown={handleKeyDown} ref={pageRef} data-cy="homepage">
      <ControlBar getNewWord={handleGetNewWord}></ControlBar>
      <Board draftWord={guess} guesses={guesses} hasWon={hasWon}></Board>
      <Definition hasWon={hasWon} word={answer?.join("")} isOpen={isDefinitionOpen} setIsOpen={setIsDefinitionOpen}></Definition>
      <Message message={message}></Message>
      <Keyboard onKeyClick={handleKeyClick} charlist={charStatus}></Keyboard>
    </div>
  );
}