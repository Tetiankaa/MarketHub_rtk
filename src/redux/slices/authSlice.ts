import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import {ICredentials, IUser} from "../../interfaces";
import {AxiosError} from "axios";
import {authService} from "../../services";

type IState = {
    authUser:IUser,
    error:string,
    isLoading:boolean,
}
const initialState:IState = {
    authUser:null,
    isLoading:false,
    error:null,
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

const authSlice = createSlice({
    name:"authSlice",
    initialState:initialState,
    reducers:{
        setAuthUser:(state, action) =>{
            state.authUser = action.payload;
        }
    },
    extraReducers:builder =>
        builder
            .addMatcher(isFulfilled(login, getAuthUser),(state, action)=>{
                state.authUser = action.payload;
                state.isLoading = false;
                state.error = null;
            })

            .addMatcher(isPending(login, getAuthUser),state => {
                state.isLoading = !state.isLoading
            })
            .addMatcher(isRejected(login, getAuthUser), (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string
            })
    }
)

const {reducer:authReducer,actions} = authSlice;

const authActions = {...actions, login, getAuthUser};

export {
    authSlice,
    authReducer,
    authActions
}
