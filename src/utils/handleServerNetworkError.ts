import axios from "axios";
import {changeStatusLoadingAC, setErrorAC} from "../redux/app-reducer";
import {Dispatch} from "redux";

export const handleServerNetworkError = (err: unknown, dispatch: Dispatch):void => {
    let errorMessage = "Some error occurred";
    if (axios.isAxiosError(err)) { // Проверка на наличие axios ошибки
        errorMessage = err.response?.data?.message || err?.message || errorMessage;

    } else if (err instanceof Error) {  // Проверка на наличие нативной ошибки
        errorMessage = `Native error: ${err.message}`;
    } else {
        errorMessage = JSON.stringify(err);// Какой-то непонятный кейс
    }
    dispatch(setErrorAC( errorMessage));
    dispatch(changeStatusLoadingAC("failed" ));
};