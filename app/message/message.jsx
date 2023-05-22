import styles from './styles.module.css';

export default function Message({ message }){
    return (
      <div className={styles.messageBox}>
        { message ? message.content : null }
      </div>
    )
}