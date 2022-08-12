import styles from "./Board.module.css";
import Line from "./Line";

const Board = (props) => {
  return (
    <div className={styles.board}>
      {props.board.map((guess, attemptValue) => {
        return (
          <Line key={attemptValue} guess={guess} attemptValue={attemptValue} />
        );
      })}
    </div>
  );
};

export default Board;
