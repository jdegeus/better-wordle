'use client';

import styles from './styles.module.css';

// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import {
    faXmark,
    faRotateRight
} from "@fortawesome/free-solid-svg-icons";

import ActionButton from '../buttons/actionButton';

export default function ControlBar({ getNewWord }) {
    return (
      <div id={styles.controlBar} data-cy="control-bar">
        <ActionButton trigger={getNewWord}>New word <FontAwesomeIcon className={styles.icon} icon={faRotateRight}/></ActionButton>
      </div>
    )
}