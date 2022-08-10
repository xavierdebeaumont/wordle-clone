import React from 'react'
import Tile from './Tile'
import styles from './Line.module.css'

const Line = (props) => {
    return (
        <div className={styles.line}> {props.guess.map((letterValue, letterPos) => {
            return (
                <Tile key={letterPos} letterValue={letterValue} letterPos={letterPos} attemptValue={props.attemptValue}/>
                )
        })
        }
        </div>

    )
}

export default Line