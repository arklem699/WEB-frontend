import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import axios from "axios";


const dataSlice = createSlice({
    name: "data",
    initialState: {
        Data: [], 
        SumShoppingCart: 0,
    },
    reducers: {
        setData(state, {payload}) {  // изменяем состояние на полученные данные
            state.Data = payload
        },
        sendAppl(state, {payload}) {  
            state.Data = [];
        },
        delAppoint(state, { payload }) {
            const { id } = payload;
            // Удаляем услугу из массива
            state.Data = state.Data.filter(appointment => appointment.id !== id);
        }
    }
})

export const useData = () =>
    useSelector((state) => state.ourData.Data)

export const useSum = () =>
    useSelector((state) => state.ourData.SumShoppingCart)

export const {
    setData: setDataAction,
    sendAppl: sendApplAction,
    delAppoint: delAppointAction
} = dataSlice.actions

export const deleteAppointment = (id) => async (dispatch) => {
  
    // Отправка запроса на удаление на бэкенд
    await axios.delete(`http://127.0.0.1:8000/appapp/${id}/`, { withCredentials: true });
    dispatch(delAppointAction({ id }));
}

export const sendApplication = (id_appl) => async (dispatch) => {
  
    // Отправка запроса на формирование на бэкенд
    await axios.put(`http://127.0.0.1:8000/application/${id_appl}/user/put/`, null, { withCredentials: true });
    dispatch(sendApplAction({ id_appl }));
}


export default dataSlice.reducer