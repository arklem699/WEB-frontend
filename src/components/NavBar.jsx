import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { logout, updateUser } from "../slices/auth";
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from "react-router-dom";


const NavBar = () => {

    const { user: currentUser } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedUser) {
            dispatch(updateUser(storedUser)); 
        }

    }, [dispatch]);

    const logOut = useCallback(() => {

        dispatch(logout());

    }, [dispatch]);

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
                Главная
            </Link>

            {currentUser ? (
                <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={"/"} className="nav-link">
                        { currentUser.username }
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/shopcart"} className="nav-link">
                        <FaShoppingCart />
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={logOut}>
                        Выйти
                    </a>
                </li>
                </div>
            ) : (
                <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                        Войти
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                        Регистрация
                    </Link>
                </li>
                </div>
            )}
            </nav>
        </div>
    )
};

export default NavBar;