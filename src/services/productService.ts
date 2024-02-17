import {apiService} from "./apiService";
import {urls} from "../constants";
import {IRes} from "../types";
import {IResProduct} from "../interfaces";

const productService = {
    getAll:(skip:number,limit:number):IRes<IResProduct>=>apiService.get(urls.products.base,{params:{skip,limit}})
}

export {
    productService
}