'use client';

import styles from './styles.module.css';

import Card from '../card/card';
import DefaultButton from '../buttons/defaultButton';

import { useEffect, useState } from 'react';

export default function Definition({ hasWon, word }) {
  const [definition, setDefinition] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function openDefinition(){
    setIsOpen(true);
  }

  function closeDefinition(){
    setIsOpen(false);
  }

  useEffect(() => {
    if(hasWon){
      setIsLoading(true);
      getDefinition(word.join(""), (def) => {
        setIsLoading(false);
        setDefinition(def);
      },(err) => {
        setIsLoading(false);
      });
    }
  }, [hasWon])
  if(!hasWon) return;

  return (
    <div className={styles.buttonRow}>
      <Element isLoading={isLoading} hasDefinition={definition} openDefinition={openDefinition}></Element>
      <Card data={definition} isOpen={isOpen} closeCard={closeDefinition}></Card>
    </div>
  );
}

function Element({ openDefinition, isLoading, hasDefinition }) {
  if(isLoading) return <div>Loading..</div>;
  if(hasDefinition) return <DefaultButton trigger={openDefinition}>Definition</DefaultButton>;
  return <div>No definition..</div>;
}

async function getDefinition(word, resolve, reject) {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const json = await response.json();
    resolve(json[0]);
  } catch(err){
    console.log(err);
    reject(err);
  }
}