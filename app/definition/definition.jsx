import styles from './styles.module.css';

import DefaultButton from '../buttons/defaultButton';

export default function Definition({ isLoading, hasWon, hasMeaning, openDefinition }) {

  if(!hasWon) return;

  return (
    <div className={styles.buttonRow}>
      <Element isLoading={isLoading} hasMeaning={hasMeaning} openDefinition={openDefinition}></Element>
    </div>
  );
}

function Element({ openDefinition, isLoading, hasMeaning }) {
  if(isLoading) return <div>Loading..</div>;
  if(hasMeaning) return <DefaultButton trigger={openDefinition}></DefaultButton>;
  return <div>No definition..</div>;
}