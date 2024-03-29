import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import axios from "axios";


const dataSlice = createSlice({
    name: "data",
    initialState: {
        Data: [], 
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
        },
        sendAppoint(state, {payload}) {
            const { id } = payload;
            state.Data.push({ id }); // добавляем новый объект с указанным id
        }
    }
})

export const useData = () =>
    useSelector((state) => state.ourData.Data)

export const {
    setData: setDataAction,
    sendAppl: sendApplAction,
    delAppoint: delAppointAction,
    sendAppoint: sendAppointAction
} = dataSlice.actions

export const deleteAppointment = (id) => async (dispatch) => {
  
    // Отправка запроса на удаление на бэкенд
    await axios.delete(`http://127.0.0.1:8000/appapp/${id}/`, { withCredentials: true });
    dispatch(delAppointAction({ id }));
}

export const sendApplication = (data) => async (dispatch) => {

    axios.put(`http://127.0.0.1:8000/application/${data[0].id_appl}/user/put/`, null, { withCredentials: true }),
    axios.post(`http://127.0.0.1:9000/was/`, { data: data }, { headers: { 'Content-Type': 'application/json' }}, { withCredentials: true })

    dispatch(sendApplAction());
}

export const sendAppointment = (id) => async (dispatch) => {
  
    // Отправка запроса на формирование на бэкенд
    await axios.post(`http://127.0.0.1:8000/appointment/${id}/`, null, { withCredentials: true });
    dispatch(sendAppointAction({ id }));
}


export default dataSlice.reducer