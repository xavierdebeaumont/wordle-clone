import React from 'react'
import classes from './Game.module.css'

const Game = (props) => {
  return (
    <div className={classes.game}>{props.children}</div>
  )
}

export default Game