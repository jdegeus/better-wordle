'use client';

import styles from './styles.module.css';

export default function DefaultButton({ trigger, children }) {
    return <div className={styles.defaultButton} onClick={trigger} data-cy="default-button">{ children }</div>;
}