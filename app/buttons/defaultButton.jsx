import styles from './styles.module.css';

export default function DefaultButton({ trigger, children }) {
    return <div className={styles.defaultButton} onClick={trigger}>{ children }</div>;
}