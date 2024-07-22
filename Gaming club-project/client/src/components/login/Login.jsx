import { login } from "../../api/userService";
import { setUserData } from "../../utils/userDataHelper";

import { useForm } from "../../hooks/useForm";

import styles from "../FormsAndErrors.module.css"

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export default function Login() {
    const [errMessage, setErrMessage] = useState({});
    const [isError, setIsError] = useState(false);
    const initalValues = {
        username: "",
        password: "",
    }
    const { setUserHandler } = useContext(UserContext);

    const navigate = useNavigate();

    const { formValues, changeHandler, submitHandler } = useForm(initalValues, onLogin);

    async function onLogin() {
        let username = formValues.username;
        let password = formValues.password;

        try {
            const user = await login({ username, password });
            setUserData(user);
            setUserHandler(user);
            navigate("/");
        } catch (err) {
            console.log(err.message)
            setErrMessage(JSON.parse(err.message));
            setIsError(true);
            return;
        }
    }

    return (
        <>
            <form onSubmit={submitHandler} className={styles.form}>
                <h3>Here you can login in your account</h3>
                {errMessage instanceof Array
                    ? <label className={styles.errorMessage}>{errMessage[0]}</label>
                    : errMessage.username
                        ? <label className={styles.errorMessage}>{errMessage.username}</label>
                        : <label>Username</label>
                }
                <input type="text" name="username" value={formValues.username} onChange={changeHandler} />
                {errMessage instanceof Array
                    ? <label className={styles.errorMessage}>{errMessage[0]}</label>
                    : errMessage.password
                        ? <label className={styles.errorMessage}>{errMessage.password}</label>
                        : <label>Password</label>
                }
                <input type="password" name="password" value={formValues.password} onChange={changeHandler} />
                <p>You don't have account? <Link to="/register">Register</Link> here.</p>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}