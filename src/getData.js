import {useEffect} from "react";
import axios from "axios"
import {setDataAction} from "./slices/dataSlice";
import {useDispatch} from "react-redux";

export function GetData() {
    const dispatch = useDispatch()
    async function fetchData() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/application/user/', { withCredentials: true });
            dispatch(setDataAction(response.data));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        fetchData()
    }, []) 
}