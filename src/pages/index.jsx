import styles from './styles.module.css';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import Keyboard from '../app/keyboard/keyboard';
import Board from '../app/board/board';
import Message from '../app/message/message';
import Definition from '../app/definition/definition';
import Wordle from './logic/Wordle';

const SPECIAL_CHAR_REGEX = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

const wordle = new Wordle();

export default function HomePage() {
  const pageRef = useRef();
  const router = useRouter();

  const [cursorIndex, setCursorIndex] = useState(0);
  const [guess, setGuess] = useState(new Array(5).fill(null));
  const [hasWon, setHasWon] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if(router.query?.word){
      wordle.setAnswer(router.query?.word);
    }
  }, [router.query.word]);

  function handleKey(key) {

    if(key.toLowerCase() === "escape") {
      //setDefinitionOpen(false);
    }

    if(hasWon) return;
    setMessage(null);
    
    if(key.toLowerCase() === "enter"){
      const answer = wordle.getAnswer();
      if(cursorIndex === answer.length - 1 && guess[cursorIndex] !== null){
        const response = wordle.makeGuess(guess);
        if(response === 'WIN'){
          resetInput();
          setMessage({ content: 'You got it!', type: 'SUCCESS'});
          setHasWon(true);
          return;
        }

        if(response === 'NON_EXISTENT') {
          setMessage({ content: 'Word does not exist.', type: 'ERROR'});
          return;
        }

        resetInput();
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

  function resetInput(){
    setGuess(new Array(wordle.getAnswer().length).fill(null));
    setCursorIndex(0);
  }

  useEffect(() => {
    if(!wordle.getAnswer()){
      wordle.setRandomAnswer();
    }

    pageRef.current.focus();
  });

  useEffect(() => {
    //console.log(wordle.getAnswerToString());
  }, [guess]);
  
  return (
    <div tabIndex="1" id={styles.page} onKeyDown={handleKeyDown} ref={pageRef} data-cy="homepage">
        <Board draftWord={guess} guesses={wordle.getGuesses()} hasWon={hasWon}></Board>
        <Definition hasWon={hasWon} word={wordle.getAnswerToString()}></Definition>
        <Message message={message}></Message>
        <Keyboard onKeyClick={handleKeyClick} charlist={wordle.getCharStatus()}></Keyboard>
    </div>
  );
}