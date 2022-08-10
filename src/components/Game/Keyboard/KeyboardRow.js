import React from 'react'
import Key from './Key'
import styles from './KeyboardRow.module.css'

const KeyboardRow = (props) => {
    return (
        <div className={styles.row}>{
            props.keyLineValue.map((keyValue, indexKey) => {
                return (
                    <Key key={indexKey} keyValue={keyValue} />
                )
            })
        }
        </div>
    )
}

export default KeyboardRow