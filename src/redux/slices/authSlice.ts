import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import {ICredentials, IRegisterUser, IUser} from "../../interfaces";
import {AxiosError} from "axios";
import {authService, userService} from "../../services";

type IState = {
    authUser:IUser,
    error:string,
    isLoading:boolean,
    activePage:string
}
const initialState:IState = {
    authUser: null,
    isLoading:false,
    error:null,
    activePage:''
}

const login = createAsyncThunk<IUser,ICredentials>(
    "login/authSlice",
    async (credentials,{rejectWithValue})=>{
        try {
            return await authService.login(credentials);
        }catch (e){
            const error = e as AxiosError;
            return rejectWithValue(error.response?.data)
        }
    }
)

const getAuthUser = createAsyncThunk<IUser,void>(
    'getAuthUser/authSlice',
            async (_,{rejectWithValue})=>{
        try {
           const {data} = await authService.getAccountInfo();
           return data;
        }catch (e){
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
            }
)

const register = createAsyncThunk<IUser,IRegisterUser>(
    "register/authSlice",
    async (user:IRegisterUser,{rejectWithValue})=>{
        try {
            const {data} = await userService.create(user);
            console.log(data);
            return data;
        }catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
)

const authSlice = createSlice({
    name:"authSlice",
    initialState:initialState,
    reducers:{
        setAuthUser:(state, action) =>{
            state.authUser = action.payload;
        },
        setActivePage:(state,  action)=> {
            state.activePage = action.payload;
        }

    },
    extraReducers:builder =>
        builder
            .addMatcher(isFulfilled(login, getAuthUser, register),(state, action)=>{
                state.authUser = action.payload;
                state.isLoading = false;
                state.error = null;
            })

            .addMatcher(isPending(login, getAuthUser, register),state => {
                state.isLoading = !state.isLoading
            })
            .addMatcher(isRejected(login, getAuthUser, register), (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string
            })
    }
)

const {reducer:authReducer,actions} = authSlice;

const authActions = {...actions, login, getAuthUser, register};

export {
    authSlice,
    authReducer,
    authActions
}
