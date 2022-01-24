import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";


const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val.includes("@") };
    }
    else if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.includes('@') };
    }
    return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
    if (action.type === 'USER_PASSWORD') {
        return { value: action.val, isValid: action.val.trim().length > 6 };
    }
    else if (action.type === 'PASSWORD_BLUR') {
        return { value: state.value, isValid: state.value.trim().length > 6 };
    }
    return { value: '', isValid: false };
}

const Login = (props) => {
    // const [enteredEmail, setEnteredEmail] = useState("");
    // const [emailIsValid, setEmailIsValid] = useState();
    // const [enteredPassword, setEnteredPassword] = useState("");
    // const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispachEmail] = useReducer(emailReducer, {
        value: "",
        isValid: null,
    });

    const [passwordState, dispachPassword] = useReducer(passwordReducer, {
        value: "",
        isValid: null,
    });

    // use object destructuring,
    const { isValid: emailIsValid } = emailState; 
    const { isValid: passwordIsValid } = passwordState; 

    useEffect(() => {
      const identifier = setTimeout(() => {
        console.log('Checking form validity!');
        setFormIsValid(
            emailIsValid && passwordIsValid // this is with object destructuring
            // emailState.isValid && passwordState.isValid // this is without destructuring
        );
      }, 500);

      return () => {
        console.log('CLEANUP');
        clearTimeout(identifier);
      };
    }, [emailIsValid, passwordIsValid]); // this is with object destructuring
    // }, [emailState.isValid, passwordState.isValid]); // this is without destructuring

    const emailChangeHandler = (event) => {
        dispachEmail({type: 'USER_INPUT', val: event.target.value});
    };

    const passwordChangeHandler = (event) => {
        dispachPassword({type: 'USER_PASSWORD', val: event.target.value});
    };

    const validateEmailHandler = () => {
        dispachEmail({
            type: 'INPUT_BLUR'
        })
    };

    const validatePasswordHandler = () => {
        dispachPassword({
            type: 'PASSWORD_BLUR'
        })
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailState.value, passwordState.value);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${
                        emailState.isValid === false ? classes.invalid : ""
                    }`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        passwordState.isValid === false ? classes.invalid : ""
                    }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={passwordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button
                        type="submit"
                        className={classes.btn}
                        disabled={!formIsValid}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
