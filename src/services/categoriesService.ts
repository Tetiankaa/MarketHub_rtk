import {apiService} from "./apiService";
import {urls} from "../constants";
import {IRes} from "../types";
import { IResProduct} from "../interfaces";

const categoriesService = {
    getAll:():IRes<string[]>=>apiService.get(urls.categories.base),
    getByCategoryName:(name:string,skip:number, limit:number):IRes<IResProduct>=>apiService.get(urls.categories.byCategoryName(name),{params:{skip, limit}})
}

export {
    categoriesService
}