'use client';

import styles from './styles.module.css';

// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import {
    faXmark
} from "@fortawesome/free-solid-svg-icons";

export default function Card({ data, isOpen, closeCard }) {

    function handeOutsideClick(event){
        if(event.target.dataset.outside) {
            closeCard();
        }
    }

    function handeXClick(){
        closeCard();
    }

    if (!isOpen) return null;
    if (!data) return null;

    return (
        <div id={styles.card} onClick={(event)=> handeOutsideClick(event)} data-outside data-cy="card">
            <div className={styles.inner} data-cy="card-inner">
                <div className={styles.closeButton} onClick={()=> handeXClick()} data-cy="card-close">
                    <FontAwesomeIcon className={styles.xMark} icon={faXmark}/>
                </div>
                <h1>{data.word}</h1>
                <div>{data.phonetic}</div>
                {
                    data.meanings.map((meaning, i) => (
                        <div key={i}>
                            <h3>{meaning.partOfSpeech}</h3>
                            <h5>Definitions:</h5>
                            {
                                meaning.definitions.map((definition, j) => (
                                    <li key={j}>{definition.definition}</li>
                                ))
                            }
                            {meaning.synonyms.length ? <h5>Synonyms:</h5> : null}
                            {
                                meaning.synonyms.map((synonym, k) => (
                                    <li key={k}>{synonym}</li>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}