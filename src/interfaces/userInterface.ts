import {IAddress} from "./addressInterface";
import {IBank} from "./bankInterface";
import {ICompany} from "./companyInterface";

export interface IUser {
    id:number,
    username:string,
    email:string,
    age:number,
    phone:string,
    firstName:string,
    lastName:string
    gender:string,
    image:string,
    token?:string,
    birthDate: string,
    address: IAddress,
    bank: IBank,
    company: ICompany

}
