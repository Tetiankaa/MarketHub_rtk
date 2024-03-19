import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {categoriesService} from "../../services";

type State = {
    categories:string[],
    selectedCategory:string,
    error:string,
    isLoading:boolean
}
const initialState:State = {
    categories:[],
    selectedCategory:'',
    error:'',
    isLoading:false
}

const getAll = createAsyncThunk<string[], void>(
    "categoriesSlice/getAll",
        async (_,{rejectWithValue})=>{
        try {
          const {data} =await categoriesService.getAll();
          return data;
        }catch (err) {
            const error = err as AxiosError;
            return rejectWithValue(error.response?.data);
        }
        }
)

const categoriesSlice = createSlice({
    name:"categoriesSlice",
    initialState:initialState,
    reducers:{
        setSelectedCategory:(state, action)=>{
            state.selectedCategory = action.payload;
        }
    },
    extraReducers:builder =>
        builder
            .addCase(getAll.fulfilled,(state, action) => {

                state.categories = action.payload.map(category => {
                    const firstLetter = category.charAt(0).toUpperCase();
                    const otherPart = category.slice(1)
                    return firstLetter + otherPart;
                });
            })
            .addMatcher(isFulfilled(getAll),state => {
                state.isLoading = false;
                state.error = null;
            })
            .addMatcher(isPending(getAll),state => {
                state.isLoading = true;
            })
            .addMatcher(isRejected(getAll),(state,action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
    }

)

const {reducer:categoriesReducer,actions} = categoriesSlice;

const categoriesActions = {...actions,getAll};

export {
    categoriesSlice,
    categoriesReducer,
    categoriesActions
}