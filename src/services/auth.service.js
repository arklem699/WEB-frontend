import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

const register = (username, email, password) => {
    return axios

        .post(API_URL + "reg/", {
            username,
            email,
            password,
        })

        .then((response) => {
            return response.data;
        })

        .catch((error) => {
            throw new Error(error.response.data.error || 'Ошибка при регистрации');
        });
};

const login = (email, password) => {
    return axios

        .post(API_URL + "login/", {
            email,
            password,
        },
        {
            withCredentials: true,  // Добавляем параметр для отправки куки
        })

        .then((response) => {
            if (response.data.email) {

              localStorage.setItem("user", JSON.stringify(response.data));

            }

            return response.data;
        })

        .catch((error) => {
            throw new Error(error.response.data.error || 'Неверный логин или пароль');
        });
};

const logout = () => {
    localStorage.removeItem("user");

    return axios.post(API_URL + "logout/").then((response) => {

        return response.data;

    });
};

const getCurrentUser = () => {

    return JSON.parse(localStorage.getItem("user"));

};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
}

export default AuthService;