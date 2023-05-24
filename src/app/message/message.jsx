'use client';

import styles from './styles.module.css';

export default function Message({ message }){
    if(!message) return null;

    return (
      <div className={styles.messageBox} data-cy="message">
        { message.content ? message.content : null }
      </div>
    )
}