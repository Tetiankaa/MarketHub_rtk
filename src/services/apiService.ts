import axios, {AxiosError} from "axios";

import {baseURL, urls} from "../constants";
import {authService} from "./authService";
import {router} from "../router";

const apiService = axios.create({baseURL});

apiService.interceptors.request.use(request=>{
    const token = authService.getToken();
    if (token){
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
})

let isRefreshing = false;

type IWait = () => void;
let waitList:IWait[] = [];

const subscribeToWaitList = (callback:IWait):void =>{
    waitList.push(callback);
}
const runCallbacksAfterRefreshing = ():void =>{
  while (waitList.length){
      const cb =  waitList.pop();
      cb();
  }
}

apiService.interceptors.response.use(response => {
    return response;
},async (error:AxiosError)=>{
         const originalRequest = error.config;

            if (error.response.status === 401){
                if (!isRefreshing){
                    isRefreshing = true;
                    try {
                        await authService.refresh();
                        isRefreshing = false;
                        runCallbacksAfterRefreshing();
                        return apiService(originalRequest);
                    }catch (e) {
                        authService.removeToken();
                        isRefreshing = false;
                        await router.navigate('/account/login?SessionExpired=true');
                        return Promise.reject(error);
                    }
                }
                if (originalRequest.url === urls.auth.refresh){
                    return Promise.reject(error);
                }
                return new Promise(resolve => {
                    subscribeToWaitList(()=>resolve(apiService(originalRequest)))
                })
            }
    }
)
export {
    apiService
}
