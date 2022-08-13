import React, { useContext } from "react";
import { AppContext } from "../../App";
import styles from "./GameOver.module.css";
import Modal from "../UI/Modal";

const GameOver = (props) => {
  const { gameOver, solution, currInput, replay } = useContext(AppContext);

  return (
    <Modal onConfirm={props.onConfirm} onReplay={props.onReplay}>
      <h1 className={styles.border}>
        {gameOver.guessedWord ? "Congrats ! You won !!!" : "You lost"}
      </h1>
      <h1 className={styles.border}>Correct word: {solution}</h1>
      {gameOver.guessedWord && (
        <h1 className={styles.border}>
          You guessed in {currInput.attempt} attempts
        </h1>
      )}
      {replay > 0 && (
        <h1 className={styles.border}>You played {replay+1} times</h1>
      )}
    </Modal>
  );
};

export default GameOver;
