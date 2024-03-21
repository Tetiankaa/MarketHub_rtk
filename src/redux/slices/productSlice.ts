import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import {IProduct, IResProduct, ISearch, ISkipLimitValues} from "../../interfaces";
import {categoriesService, productService, searchService} from "../../services";
import {AxiosError} from "axios";

type IState = {
    products:IProduct[],
    total:number,
    skip:number,
    limit:number,
    isLoading:boolean,
    error:string,
    searchValue:'',
    totalPages:number,
    limitPerPage:number
}
const initialState:IState = {
    products:[],
    total:null,
    skip:null,
    limit:null,
    isLoading:null,
    error:null,
    searchValue:'',
    totalPages:0,
    limitPerPage: 16
}

const getAll = createAsyncThunk<IResProduct,ISkipLimitValues>(
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

const getByCategoryName = createAsyncThunk<IResProduct,{category: string, skip:number, limit:number}>(
    "productSlice/getByCategoryName",
    async ({category,skip, limit},{rejectWithValue})=>{
                try {
                  const {data} = await categoriesService.getByCategoryName(category,skip, limit);
                  return data;
                }catch (e){
                    const error = e as AxiosError;
                    return rejectWithValue(error.response?.data);

                }
    }
)

const searchProducts = createAsyncThunk<IResProduct, {search: string, skip:number, limit:number}>(
    "productSlice/searchProducts",
    async ({search, skip, limit},{rejectWithValue})=>{
        try {
           const {data} =  await searchService.getAll(search,skip, limit);
           return data;
        }catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response?.data);
        }
    }
)

const productSlice = createSlice({
    name:"productSlice",
    initialState:initialState,
    reducers:{
        setSearchValue:(state, action)=>{
            state.searchValue = action.payload
        }
    },
   extraReducers:builder =>
       builder
           .addMatcher(isFulfilled(getAll, getByCategoryName, searchProducts), (state, action)=>{
               const {products,total,skip,limit} = action.payload;
               state.products = products;
               state.total = total;
               state.skip = skip;
               state.limit = limit;
               state.totalPages =  Math.ceil(total / state.limitPerPage)
           })
           .addMatcher(isFulfilled(getAll, getByCategoryName, searchProducts),(state)=>{
               state.error = null;
               state.isLoading = false;
           })
           .addMatcher(isPending(getAll, getByCategoryName,searchProducts),state => {
               state.isLoading = true;
           })
           .addMatcher(isRejected(getAll, getByCategoryName, searchProducts),(state, action) => {
               state.error = action.payload as string;
               state.isLoading = false;
           })

})

const {reducer:productReducer,actions} = productSlice;

const productActions = {...actions,getAll, getByCategoryName, searchProducts};

export {
    productSlice,
    productActions,
    productReducer
}
