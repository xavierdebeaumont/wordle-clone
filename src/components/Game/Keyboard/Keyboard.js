import React, { useCallback, useContext, useEffect } from 'react'
import { AppContext } from '../../../App'
import styles from './Keyboard.module.css'
import KeyboardRow from './KeyboardRow'

const Keyboard = () => {
  const keyboardValues = [
    ["Q", "W", "E" ,"R" ,"T", "Y" ,"U", "I" ,"O" ,"P"],
    ["A", "S", "D" ,"F" ,"G", "H" ,"J", "K" ,"L"],
    ["ENTER", "Z", "X" ,"C" ,"V", "B" ,"N", "M", "DELETE"],
  ]

  const {onDelete, onEnter, onSelectLetter} = useContext(AppContext)

  const HandleKeyboard = useCallback((event) => {
    if(event.key === 'Enter'){
      onEnter();
    }
    else if (event.key === 'Backspace'){
      onDelete();
    } else {
      keyboardValues.flat(1).forEach((key) => {
        if(event.key.toLowerCase() === key.toLowerCase()){
          onSelectLetter(key);
        }
      })
    }
  })

  useEffect(() => {
    document.addEventListener("keydown", HandleKeyboard)
    return () => {
      document.removeEventListener("keydown", HandleKeyboard)
    }
  }, [HandleKeyboard])

  return (
    <div className={styles.keyboard} onKeyDown={HandleKeyboard}>
      {keyboardValues.map((keyLineValue) => {
        return(
          <KeyboardRow keyLineValue={keyLineValue}/>
        )
      })}
    </div>
  )
}

export default Keyboard