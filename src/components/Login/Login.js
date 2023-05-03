import React, { useEffect, useState, useReducer, useContext, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../context/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.includes("@"),
    };
  }

  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.includes("@"),
    };
  }

  return {
    value: "",
    isValid: false,
  };
};

const passwordReducer = (state, action) => {
  if (action.type === "PASS_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6,
    };
  }

  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6,
    };
  }

  return {
    value: "",
    isValid: false,
  };
};

const Login = (props) => {
  const authCtx = useContext(AuthContext);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: "", isValid: null});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: "", isValid: null});

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailState.isValid && passwordState.isValid);
      console.log("setTimeOut");
    }, 500);

    return () => {
      console.log("cleared");
      clearTimeout(identifier);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value })
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: "PASS_INPUT", val: event.target.value});
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" })
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: "INPUT_BLUR"});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailState.isValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>

        <Input label="E-Mail" id="email" isValid={emailState.isValid} type="email" value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} ref={emailInputRef} />

        <Input label="Password" id="password" isValid={passwordState.isValid} type="password" value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} ref={passwordInputRef} />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
