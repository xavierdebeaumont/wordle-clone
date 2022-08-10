import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../../App'
import classes from './Tile.module.css'

const Tile = (props) => {
  const { solution, currInput, setLettersInfo } = useContext(AppContext)
  const letterValue = props.letterValue.toLowerCase()
  const isCorrect = solution[props.letterPos] === letterValue;
  const isClose = !isCorrect && props.letterValue !== "" && solution.includes(letterValue);

  useEffect(() => {
    let newInfo = {};
    if(letterValue !== ""){
      if (isCorrect) {
        newInfo = "correct";
      }
      else if (isClose) {
        newInfo = "almost";
      }
      else {
        newInfo = "error";
      }
      setLettersInfo((prevInfo) => {
        return {...prevInfo, [letterValue]: newInfo}
      })
    }
  }, [currInput.attempt]);


  const letterStyle = currInput.attempt > props.attemptValue && (isCorrect ? classes.correct : isClose ? classes.almost : classes.error)

  return (
    <div className={`${classes.tile} ${letterStyle}`}>{props.letterValue}</div>
  )
}

export default Tile