import React, { createContext, useEffect, useReducer, useState } from "react";
import { LoginData, LoginResponse, RegisterData, User, designs_user } from '../interfaces/ILogin';
import { AuthState, authReducer } from "./authReducer";
import loginAPI from "../api/loginAPI";
import AsyncStorage from '@react-native-async-storage/async-storage';


type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: User | null;
    designs_user: designs_user | null;
    status: 'cheking' | 'authenticated' | 'not-authenticated';
    singUp: (registerData: RegisterData) => void;
    singIn: (loginData: LoginData) => void;
    logOut: () => void;
    getDesigns: (userId: any) => void;
    addDesigns: (userId: any, data: any) => void;
    updateDesign: (userId: any, designId: any, data: any) => void;
    deleteDesign: (userId: any, designId: any) => void;
    updateUser: (userId: any, updatedData: any) => void;
    removeError: () => void;
}


const authInitialState: AuthState = {
    status: 'cheking',
    token: null,
    user: null,
    designs_user: null,
    errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {


    const [state, dispatch] = useReducer(authReducer, authInitialState);


    useEffect(() => {
        checkToken();
    }, []);

    async function checkToken() {

        const token = await AsyncStorage.getItem('token');

        if (!token) return dispatch({ type: 'notAuthenticated' });
        try {
            const resp = await loginAPI.get('/validateToken');

            if (resp.status !== 200) {
                return dispatch({ type: 'notAuthenticated' })
            }

            await AsyncStorage.setItem('token', resp.data.token);
            dispatch({
                type: 'singUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.user
                }
            });
        } catch (error) {
            return dispatch({ type: 'notAuthenticated' })
        }

    }

    const singUp = async ({ email, password, username }: RegisterData) => {
        try {
            const resp = await loginAPI.post<LoginResponse>('/register', { email, password, username });
            dispatch({
                type: 'singUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.user
                }
            })
            await AsyncStorage.setItem('token', resp.data.token);
        } catch (error: any) {
            dispatch({
                type: "addError",
                payload: error.response.data.message || 'El correo ya esta registrado'
            })
        }

    };

    const singIn = async ({ email, password }: LoginData) => {
        try {
            const resp = await loginAPI.post<LoginResponse>('/login', { email, password }
            );

            dispatch({
                type: 'singUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.user
                }
            });
            await AsyncStorage.setItem('token', resp.data.token);
        } catch (error: any) {
            console.log(error);
            dispatch({
                type: "addError",
                payload: error.response.data.message || 'Información incorrecta'
            })
        }
    };

    const updateUser = async (userId: string, updatedData: User) => {

        try {
            const resp = await loginAPI.put(`/updateUser/${userId}`, updatedData);

            dispatch({
                type: 'updateUser',
                payload: {
                    user: resp.data.user
                }
            });
        } catch (error: any) {
            console.log(error);
            dispatch({
                type: "addError",
                payload: error.response.data.message || 'No se actualizó los datos'
            })
        }
    }

    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' });
    };

    const removeError = () => {
        dispatch({
            type: 'removeError',
        }
        )
    };

    const getDesigns = async (userId: string) => {
        try {
            const resp = await loginAPI.get(`/getDesings/${userId}`, {

            });
            dispatch({
                type: 'getDesigns',
                payload: {
                    designs_user: resp.data
                }
            });
            return resp.data;
        } catch (error: any) {
            console.log(error);
            dispatch({
                type: "addError",
                payload: error.response.data.message || 'No se obtuvieron los diseños'
            })
        }
    }

    const addDesigns = async (userId: string, data: designs_user) => {

        try {
            const resp = await loginAPI.post(`/addDesignToUser/${userId}`, data, {

                headers: {
                    'Content-Type': 'multipart/form-data',
                },            }

            );

            dispatch({
                type: 'addDesigns',
                payload: {
                    designs_user: resp.data
                }
            });

            return resp;
        } catch (error: any) {
            console.log(error);
            dispatch({
                type: "addError",
                payload: error.response.data.message || 'No se guardó el diseño'
            })
        }
    }

    const updateDesign = async (userId: string, designId: string, data: designs_user) => {
        try {
            const resp = await loginAPI.put(`/updateDesign/${userId},${designId}`, data);

            dispatch({
                type: 'updateDesign',
                payload: {
                    designs_user: resp.data
                }
            });
        } catch (error: any) {
            console.log(error);
            dispatch({
                type: "addError",
                payload: error.response.data.message || 'No se actualizó el diseño'
            })
        }
    }

    const deleteDesign = async (userId: string, designId: string) => {
        try {
            const resp = await loginAPI.delete(`/deleteDesign/${userId},${designId}`);

            dispatch({
                type: 'updateDesign',
                payload: {
                    designs_user: resp.data
                }
            });
        } catch (error: any) {
            console.log(error);
            dispatch({
                type: "addError",
                payload: error.response.data.message || 'No se elimino el diseño guardado'
            })
        }
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            singUp,
            singIn,
            logOut,
            updateUser,
            getDesigns,
            addDesigns,
            updateDesign,
            deleteDesign,
            removeError
        }}>
            {children}
        </AuthContext.Provider>

    )
}