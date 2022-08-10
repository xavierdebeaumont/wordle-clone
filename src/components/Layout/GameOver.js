import React, { useContext } from 'react'
import { AppContext } from '../../App'
import classes from './GameOver.module.css'

const GameOver = () => {
    const {gameOver, solution, currInput} = useContext(AppContext);
  return (
    <div className={classes.gameover}>
        <h3>{gameOver.guessedWord ? "Congrats ! You won !!!" : "You lost"}</h3>
        <h1>Correct: {solution}</h1>
        {gameOver.guessedWord && (<h3>You guessed in {currInput.attempt} attempts</h3>)}
    </div>
  )
}

export default GameOver