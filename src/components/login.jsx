import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../slices/auth";
import { clearMessage } from "../slices/message";
import NavBar from "./NavBar";
import Breadcrumbs from "./Breadcrumbs";

const Login = () => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);

    const dispatch = useDispatch();

    const getSessionId = () => {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'session_id') {
                return value;
            }
        }
        return null;
    };

    useEffect(() => {
        dispatch(clearMessage());
        const getSessionId = () => {
            const cookies = document.cookie.split(';');
            for (const cookie of cookies) {
                const [name, value] = cookie.trim().split('=');
                if (name === 'session_id') {
                    return value;
                }
            }
            return null;
        };
    }, [dispatch, navigate]);

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Обязательное поле"),
        password: Yup.string().required("Обязательное поле"),
    });

    const handleLogin = (formValue) => {
        const { email, password } = formValue;
        setLoading(true);

        dispatch(login({ email, password }))
            .unwrap()

            .then(() => {
                navigate("/");
            })

            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <NavBar />
            <Breadcrumbs />
            <div className="col-md-12 login-form">
                <div className="card-auth card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleLogin}
                    >

                    {({ errors, touched }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="email">Почта</label>
                                <Field
                                    name="email"
                                    type="text"
                                    className={
                                    "form-control" +
                                    (errors.email && touched.email ? " is-invalid" : "")
                                    }
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Пароль</label>
                                <Field
                                    name="password"
                                    type="password"
                                    className={
                                    "form-control" +
                                    (errors.password && touched.password ? " is-invalid" : "")
                                    }
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>

                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    disabled={loading}
                                >
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Войти</span>
                                </button>
                            </div>
                        </Form>
                    )}
                    </Formik>
                </div>

                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;