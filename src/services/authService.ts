import {ICredentials, IUser} from "../interfaces";
import {IRes} from "../types";
import {apiService} from "./apiService";
import {urls} from "../constants";

const authService = {
    async login(credentials:ICredentials):Promise<IUser>{
     const {data:{token}} = await apiService.post(urls.auth.login, credentials);
     this.setToken(token);
        console.log(token)
     const {data} = await this.getAccountInfo();
     return data;
    },

    setToken(token:string):void{
        localStorage.setItem('token',token);
    },
    getToken():string{
       return localStorage.getItem('token');

    },
    removeToken():void{
        localStorage.removeItem('token');
    },
    getAccountInfo():IRes<IUser>{
        return apiService.get(urls.auth.user);
    }

}

export {
    authService
}
