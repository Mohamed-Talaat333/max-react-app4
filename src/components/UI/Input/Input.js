import React, { forwardRef } from "react";
import classes from "./Input.module.css";

const Input = forwardRef((props, ref) => {
  return (
    <div className={`${classes.control} ${props.isValid === false ? classes.invalid : ""} ${props.className}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input type={props.type} id={props.id} value={props.value} onChange={props.onChange} onBlur={props.onBlur} ref={ref} />
    </div>
  );
});

export default Input;
