import styles from './styles.module.css';

import DefaultButton from '../buttons/defaultButton';

export default function Definition({ hasWon, hasMeaning, openDefinition }) {

    if(!hasWon) return;
  
    return (
      <div className={styles.buttonRow}>
        {
          hasMeaning ? 
          <DefaultButton trigger={openDefinition}></DefaultButton>
          :
          <div>No definition..</div>
        }
      </div>
    );
  }