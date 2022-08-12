import React from "react";
import styles from "./Game.module.css";

const Game = (props) => {
  return <div className={styles.game}>{props.children}</div>;
};

export default Game;
