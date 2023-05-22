import styles from './styles.module.css';

export default function DefaultButton({ trigger }) {
    return <div className={styles.defaultButton} onClick={trigger}>Definition</div>;
}