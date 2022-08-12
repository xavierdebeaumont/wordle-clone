import React, { useContext } from "react";
import { AppContext } from "../../../App";
import styles from "./Key.module.css";

const Key = (props) => {
  const { onSelectLetter, onDelete, onEnter, lettersInfo } =
    useContext(AppContext);

  const selectletter = () => {
    if (props.keyValue === "ENTER") {
      onEnter();
    } else if (props.keyValue === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(props.keyValue);
    }
  };

  const lowKey = props.keyValue.toLowerCase();
  const keyStyle = lettersInfo[lowKey];
  const size = props.keyValue.length > 1 ? "big" : undefined;

  return (
    <button
      className={`${styles.key} ${styles[keyStyle]} ${styles[size]}`}
      onClick={selectletter}
    >
      {props.keyValue}
    </button>
  );
};

export default Key;
