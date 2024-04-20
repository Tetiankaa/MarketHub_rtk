import {useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {IUser} from "../../interfaces";

const LoginAndSecurity = () => {
    const dispatch = useAppDispatch();

    const {authUser} = useAppSelector(state => state.auth);

    const {setValue, register, handleSubmit} = useForm<IUser>();

    useEffect(() => {

        if (authUser){
            setValue('email',authUser.email)
        }
    }, [authUser,setValue]);

    const handleLoginDetails:SubmitHandler<IUser> = (user) =>{

    }
    return (
        <div>
            <form onSubmit={handleSubmit(handleLoginDetails)}>

                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text">Email</span>
                    <input type="text" className="form-control"  {...register('email')}/>
                </div>
            </form>
        </div>
    );
};

export {LoginAndSecurity};
