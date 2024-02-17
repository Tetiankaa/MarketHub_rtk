import {apiService} from "./apiService";
import {urls} from "../constants";
import {IRes} from "../types";
import {IResCategory} from "../interfaces";

const categoriesService = {
    getAll:():IRes<string[]>=>apiService.get(urls.categories.base),
    getByCategoryName:(name:string):IRes<IResCategory>=>apiService.get(urls.categories.byCategoryName(name))
}

export {
    categoriesService
}