'use client';

import styles from './styles.module.css';

export default function Keyboard ({ charlist, onKeyClick }) {
    const chars1 = Array.from("qwertyuiop");
    const chars2 = Array.from("asdfghjkl");
    const chars3 = Array.from("zxcvbnm");
    const rows = [chars1, chars2, chars3];
    chars3.unshift("del");
    chars3.push("enter");
  
    return (
      <div id={styles.keyboard} data-cy="keyboard">
          {
            rows.map((row, index) =>
              <div key={ index } className={ styles.keyboardRow }>
                { row.map((char, index) => 
                <div 
                key={ index } 
                className={ `${styles.keyboardChar} SPOT ${charlist[char]?.status}`}>
                  <span onClick={()=>onKeyClick(char)} data-cy={`keyboard-char-${char}`}>{ char }</span>
                </div>)
                }
              </div>  
            )
          }
      </div>
    );
  }