'use client';

import styles from './styles.module.css';

export default function Board({ draftWord, guesses, hasWon }) {

    return(
      <div id={styles.letterBoard} className={`${hasWon ? styles['hasWon'] : ""}`}>
        {
          guesses.map((guess, i) => 
            <div key={i} className={`${styles.letterBoxesRow}`}>
              {
                guess.map((element, j) => <div key={j} className={`${styles.letterBox} SPOT ${element.result}`}><span>{ element.char }</span></div>)
              }
            </div>
          )
        }
        <div className={styles.letterBoxesRow}>
          {
            draftWord.map((char, index) => <div key={index} className={`${styles.letterBox} SPOT`}><span>{ char }</span></div>)
          }
        </div>
      </div>
    )
  }