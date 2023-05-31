'use client';

import styles from './styles.module.css';

export default function Board({ draftWord, guesses, hasWon, setIndex, currentIndex, clickChar }) {

    return(
      <div id={styles.letterBoard} className={`${hasWon ? styles['hasWon'] : ""}`} data-cy="board">
        {
          guesses.map((guess, i) => 
            <div key={i} className={`${styles.letterBoxesRow}`} data-cy="guesses-row">
              {
                guess.map((element, j) => 
                <div key={j} onClick={() => clickChar(element.char)} className={`${styles.letterBox} SPOT ${element.result}`}>
                  <span>{ element.char }</span>
                </div>)
              }
            </div>
          )
        }
        <div className={styles.letterBoxesRow}>
          {
            draftWord.map((char, index) => 
            <div key={index} onClick={() => setIndex(index)} className={`${styles.letterBox} SPOT ${currentIndex === index ? styles.letterBoxActive : ""}`}>
              <span>{ char }</span>
            </div>)
          }
        </div>
      </div>
    )
  }