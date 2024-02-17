import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import {IProduct, IResProduct} from "../../interfaces";
import {productService} from "../../services";
import {AxiosError} from "axios";

type IState = {
    products:IProduct[],
    total:number,
    skip:number,
    limit:number,
    isLoading:boolean,
    error:string

}
const initialState:IState = {
    products:[],
    total:null,
    skip:null,
    limit:null,
    isLoading:null,
    error:null
}

const getAll = createAsyncThunk<IResProduct,{skip:number,limit:number}>(
    "productSlice/getAll",
            async ({skip,limit},{rejectWithValue})=>{
                try {
                    const {data} = await productService.getAll(skip,limit);
                    return data;
                }catch (e) {
                    const error = e as AxiosError;
                    return rejectWithValue(error.response?.data)
                }
            }
)

const productSlice = createSlice({
    name:"productSlice",
    initialState:initialState,
    reducers:{},
   extraReducers:builder =>
       builder
           .addCase(getAll.fulfilled,(state, action)=>{
               const {products,total,skip,limit} = action.payload;
               state.products = products;
               state.total = total;
               state.skip = skip;
               state.limit = limit;
           })
           .addMatcher(isFulfilled(getAll),(state)=>{
               state.error = null;
               state.isLoading = false;
           })
           .addMatcher(isPending(getAll),state => {
               state.isLoading = true;
           })
           .addMatcher(isRejected(getAll),(state, action) => {
               state.error = action.payload as string;
               state.isLoading = false;
           })

})

const {reducer:productReducer,actions} = productSlice;

const productActions = {...actions,getAll};

export {
    productSlice,
    productActions,
    productReducer
}
