import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import {IProduct, IResProduct, ISearch} from "../../interfaces";
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
    totalPages:string
}
const initialState:IState = {
    products:[],
    total:null,
    skip:null,
    limit:null,
    isLoading:null,
    error:null,
    searchValue:'',
    totalPages:''
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

const getByCategoryName = createAsyncThunk<IResProduct,{category: string}>(
    "productSlice/getByCategoryName",
    async ({category},{rejectWithValue})=>{
                try {
                  const {data} = await categoriesService.getByCategoryName(category);
                  return data;
                }catch (e){
                    const error = e as AxiosError;
                    return rejectWithValue(error.response?.data);

                }
    }
)

const searchProducts = createAsyncThunk<IResProduct,ISearch>(
    "productSlice/searchProducts",
    async ({search},{rejectWithValue})=>{
        try {
           const {data} =  await searchService.getAll(search);
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
               state.totalPages = Math.ceil(total / 16).toString()
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
