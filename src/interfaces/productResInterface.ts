import {IProduct} from "./productInterface";

export interface IResProduct{
    limit:number,
    products:IProduct[],
    skip:number,
    total:number
}