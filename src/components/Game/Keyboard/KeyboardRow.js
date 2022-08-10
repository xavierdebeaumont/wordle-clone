import React from 'react'
import Key from './Key'
import classes from './KeyboardRow.module.css'

const KeyboardRow = (props) => {
    return (
        <div className={classes.row}>{
            props.keyLineValue.map((keyValue) => {
                return (
                    <Key keyValue={keyValue} />
                )
            })
        }
        </div>
    )
}

export default KeyboardRow