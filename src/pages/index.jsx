import styles from './styles.module.css';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import Keyboard from '../app/keyboard/keyboard';
import Board from '../app/board/board';
import Message from '../app/message/message';
import Definition from '../app/definition/definition';

import { WORD_LIST } from '../../public/words_en';

const CHAR_LIST = Object.fromEntries(Array.from("qwertyuiopasdfghjklzxcvbnm").map(e => [e, { char: e, status: null}]));
const SPECIAL_CHAR_REGEX = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const INITIAL_WORD = Array.from(WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]);
//const INITIAL_WORD = Array.from('abaca');

export default function HomePage() {
  const pageRef = useRef();
  const router = useRouter();

  //const [word, setWord] = useState(Array.from(WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]));
  const [word, setWord] = useState(INITIAL_WORD);
  const [cursorIndex, setCursorIndex] = useState(0);
  const [guess, setGuess] = useState(new Array(5).fill(null));
  const [guesses, setGuesses] = useState([]);
  const [hasWon, setHasWon] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if(router.query?.word){
      setWord(Array.from(router.query?.word));
    }
  }, [router.query.word]);

  function handleKey(key) {

    if(key.toLowerCase() === "escape") {
      //setDefinitionOpen(false);
    }

    if(hasWon) return;
    
    if(key.toLowerCase() === "enter"){
      if(cursorIndex === word.length - 1 && guess[cursorIndex] !== null){
        const feedback = attemptWord();

        if(feedback === 'WIN'){
          setMessage({ content: 'You got it!', type: 'SUCCESS'});

          setHasWon(true);
          return;
        }

        if(feedback === 'NON_EXISTENT') {
          setMessage({ content: 'Word does not exist.', type: 'ERROR'});
        }
      } else {
        setMessage(null);
      }
    }

    if(key.toLowerCase() === "backspace" || key.toLowerCase() === "del"){
      deleteChar();
    }

    if(key.length === 1){
      addChar(key);
    }
  }

  function handleKeyClick(key) {
    handleKey(key);
  }

  function handleKeyDown(e) {
    console.log(e);
    const key = e.key;

    if(SPECIAL_CHAR_REGEX.test(key)){
      // possibly shake screen
      return;
    }

    if(!isNaN(parseInt(key))){
      // possibly shake screen
      return;
    }

    if(key === " "){
      // possibly shake screen
      return;
    }

    handleKey(key);
  }

  function attemptWord() {

    const guessString = guess.join("");
    const wordString = word.join("");

    if(guessString === wordString){
      return 'WIN';
    }

    if(!WORD_LIST.includes(guessString.toLowerCase())) {
      return 'NON_EXISTENT';
    }

    const attempt = guess.map((input, index) => {
      const answer = word[index].toLowerCase();
      const char = input.toLowerCase();
      return {
        answer, 
        char,
        result: answer === char ? "CORRECT_SPOT" : word.includes(char) ? null : "NO_SPOT",
      }
    });

    for(let i = 0; i < attempt.length; i++){
      if(!attempt[i].result){
        const r = attempt.findIndex(e => e.result !== "CORRECT_SPOT" && attempt[i].char === e.answer);
        if(r > -1) {
          const s = attempt.findIndex(e => e.result === "WRONG_SPOT" && e.char === attempt[i].char);
          if(s > -1 ) {
            const a = attempt.findIndex((e, j) => attempt[i].char === e.answer && j !== r);
            if(a > -1) {
              attempt[i].result = "WRONG_SPOT";
            } else {
              attempt[i].result = "NO_SPOT";
            }
          } else {
            attempt[i].result = "WRONG_SPOT";
          }
        }
        else attempt[i].result = "NO_SPOT";
      }
    }
    
    setGuesses([...guesses, attempt]);
    setGuess(new Array(word.length).fill(null));
    setCursorIndex(0);

    if(guessString === wordString){
      // won
      return true;
    }
  }

  function deleteChar(){
    setGuess(() => {
      const newGuess = [...guess];
      let newIndex = cursorIndex;
      if(newGuess[cursorIndex] === null){
        newIndex = Math.max(cursorIndex - 1, 0);
      }
      newGuess[newIndex] = null;
      setCursorIndex(newIndex);
      return newGuess;
    });
  }

  function addChar(char){
    setGuess(() => {
      const newGuess = [...guess];
      if(newGuess[cursorIndex] !== null){
        return guess;
      }
      newGuess[cursorIndex] = char;
      setCursorIndex(Math.min(cursorIndex + 1, guess.length - 1));
      return newGuess;
    });
  }

  useEffect(() => {
    pageRef.current.focus();
  });

  useEffect(() => {
    if(cursorIndex !== word.length - 1 || guess[word.length - 1] === null){
      setMessage(null);
    }
    
  }, [guess]);

  for(const guess of guesses){
    for(const pos of guess) {
      if(CHAR_LIST[pos.char].status === "CORRECT_SPOT") continue;
      CHAR_LIST[pos.char].status = pos.result;
    }
  }
  
  return (
    <div tabIndex="1" id={styles.page} onKeyDown={handleKeyDown} ref={pageRef} data-cy="homepage">
        <Board draftWord={guess} guesses={guesses} hasWon={hasWon}></Board>
        <Definition hasWon={hasWon} word={word}></Definition>
        <Message message={message}></Message>
        <Keyboard onKeyClick={handleKeyClick} charlist={CHAR_LIST}></Keyboard>
    </div>
  );
}