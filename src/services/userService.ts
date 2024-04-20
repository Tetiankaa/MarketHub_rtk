import {IRegisterUser, IUser} from "../interfaces";
import {IRes} from "../types";
import {apiService} from "./apiService";
import {urls} from "../constants";

const userService = {
    create:(userData:IRegisterUser):IRes<IUser>=>apiService.post(urls.users.add,userData),
    update:<T>(userId:number, userData:T):IRes<IUser>=>apiService.patch(urls.users.update(userId), userData)
}

export {
    userService
}
