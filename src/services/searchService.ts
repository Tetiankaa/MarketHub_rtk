import {IRes} from "../types";
import {IResProduct} from "../interfaces";
import {apiService} from "./apiService";
import {urls} from "../constants";

const searchService = {
    getAll:(query:string, skip:number, limit:number):IRes<IResProduct>=>apiService.get(urls.products.search,{params:{q:query,skip,limit}})
}

export {
    searchService
}