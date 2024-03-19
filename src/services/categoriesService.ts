import {apiService} from "./apiService";
import {urls} from "../constants";
import {IRes} from "../types";
import { IResProduct} from "../interfaces";

const categoriesService = {
    getAll:():IRes<string[]>=>apiService.get(urls.categories.base),
    getByCategoryName:(name:string):IRes<IResProduct>=>apiService.get(urls.categories.byCategoryName(name))
}

export {
    categoriesService
}