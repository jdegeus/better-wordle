import styles from './styles.module.css';

// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import {
    faXmark
} from "@fortawesome/free-solid-svg-icons";

export default function Card({ data, open, setOpen }) {

    function handeOutsideClick(event){
        if(event.target.dataset.outside) {
            setOpen(false);
        }
    }

    function handeXClick(){
        setOpen(false);
    }

    if (!open) return null;
    if (!data) return null;

    return (
        <div id={styles.card} onClick={(event)=> handeOutsideClick(event)} data-outside>
            <div className={styles.inner}>
                <div className={styles.closeButton} onClick={()=> handeXClick()}>
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