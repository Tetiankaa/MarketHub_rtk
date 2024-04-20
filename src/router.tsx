import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainLayout} from "./layouts";
import {
    ContactInformationPage,
    ForgotPasswordPage,
    LoginAccountPage, LoginAndSecurityPage,
    PaymentCardsPage,
    ProductsByCategoryPage,
    ProductsPage,
    RegisterAccountPage
} from "./pages";
import {AccountPage} from "./pages/AccountPage";

const router = createBrowserRouter([
    {path:"",element:<MainLayout/>, children:[
            {index:true,element:<Navigate to={'products'}/>},
            {path:"products",element:<ProductsPage/>},
            {path:"category/:name",element:<ProductsByCategoryPage/>},
            {path:"account/login",element:<LoginAccountPage/>},
            {path:"account/forgotpassword",element:<ForgotPasswordPage/>},
            {path:"account/register",element:<RegisterAccountPage/>},
            {path:"myaccount",element:<AccountPage/>, children:[
                    {path:"my-payment-cards", element:<PaymentCardsPage/>},
                    {path:"info", element:<ContactInformationPage/>},
                    {path:"login-and-security",element:<LoginAndSecurityPage/>}
                ]},
        ]}
])

export {
    router
}
