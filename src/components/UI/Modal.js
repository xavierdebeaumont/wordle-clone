import React from "react";
import styles from "./Modal.module.css";
import Card from "./Card";
import Button from "./Button";

const Modal = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.backdrop} onClick={props.onConfirm}></div>
      <Card className={styles.modal}>
        {props.children}
        <div className={styles["button-disposition"]}>
          <Button onClick={props.onConfirm}>Close</Button>
          <Button onClick={props.onReplay}>Replay</Button>
        </div>
      </Card>
    </div>
  );
};

export default Modal;
