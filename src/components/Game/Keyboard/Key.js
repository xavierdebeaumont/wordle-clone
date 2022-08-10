import React, { useContext } from 'react'
import { AppContext } from '../../../App'
import classes from './Key.module.css'


const Key = (props) => {
  const { onSelectLetter, onDelete, onEnter, lettersInfo } = useContext(AppContext)

  const selectletter = () => {
    if (props.keyValue === 'ENTER') {
      onEnter();
    }
    else if (props.keyValue === 'DELETE') {
      onDelete();
    }
    else {
      onSelectLetter(props.keyValue);
    }
  }

  const lowKey = props.keyValue.toLowerCase();
  const keyStyle = lettersInfo[lowKey];

  return (
    <button className={`${classes.key} ${classes[keyStyle]}`} id={props.keyValue.length > 1 ? "big" : undefined} onClick={selectletter}>
      {props.keyValue}
    </button>
  )
}

export default Key