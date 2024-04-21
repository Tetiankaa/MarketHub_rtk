import {apiService} from "./apiService";
import {urls} from "../constants";
import {IRes} from "../types";
import {IProduct, IResProduct} from "../interfaces";

const productService = {
    getAll:(skip:number,limit:number):IRes<IResProduct>=>apiService.get(urls.products.base,{params:{skip,limit}}),
    getById:(id:number | string):IRes<IProduct>=>apiService.get(urls.products.byId(id))
}

export {
    productService
}
