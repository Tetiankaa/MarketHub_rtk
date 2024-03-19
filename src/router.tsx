import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainLayout} from "./layouts";
import {ProductsByCategoryPage, ProductsPage} from "./pages";

const router = createBrowserRouter([
    {path:"",element:<MainLayout/>, children:[
            {index:true,element:<Navigate to={'products'}/>},
            {path:"products",element:<ProductsPage/>},
            {path:"category/:name",element:<ProductsByCategoryPage/>}
        ]}
])

export {
    router
}