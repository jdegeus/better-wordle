'use client';

import styles from './styles.module.css';

export default function ActionButton({ trigger, children }) {
    return <div className={styles.actionButton} onClick={trigger} data-cy="action-button">{ children }</div>;
}