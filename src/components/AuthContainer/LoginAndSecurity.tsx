import {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {IUser} from "../../interfaces";
import {authActions} from "../../redux/slices";
import {formValidator} from "../../validators";


const LoginAndSecurity = () => {
    const dispatch = useAppDispatch();

    const {authUser} = useAppSelector(state => state.auth);

    const emailFormMethods = useForm<IUser>({mode:'all',resolver:joiResolver(formValidator)});
    const passwordFormMethods  = useForm<IUser>({mode:'all',resolver:joiResolver(formValidator)});

    const [enteredEmail, setEnteredEmail] = useState<string>(authUser?.email);

    const [changeEmail, setChangeEmail] = useState<boolean>(false);
    const [changePassword, setChangePassword] = useState<boolean>(false);

    useEffect(() => {

        if (authUser){
            setEnteredEmail(authUser.email);
            emailFormMethods.setValue('email',authUser.email);
        }
    }, [authUser, emailFormMethods]);

    const handleEmailChange:SubmitHandler<IUser> = (user) =>{
        dispatch(authActions.updateUserDetails({id:authUser.id, dataToUpdate:user}))
    }
    const handlePasswordChange:SubmitHandler<IUser> = (user) =>{
        dispatch(authActions.updateUserDetails({id:authUser.id, dataToUpdate:user}))
    }

    return (
        <div>
            <h4 className={'mb-3'}>Login Details</h4>

            <div className="form-check mb-2">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="changeEmail"
                    onChange={() => setChangeEmail(prevState => !prevState)}/>
                <label className="form-check-label" htmlFor="changeEmail">
                    Change email
                </label>
            </div>

            {changeEmail &&

                <form onSubmit={emailFormMethods.handleSubmit(handleEmailChange)}>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text">Email</span>
                        <input
                            type="text"
                            className="form-control"
                            {...emailFormMethods.register('email')}
                            onChange={(e)=>setEnteredEmail(e.target.value)}/>
                    </div>
                    {emailFormMethods.formState.errors.email &&
                        <div className="form-text">{emailFormMethods.formState.errors.email.message}</div>
                    }
                    <button
                        type="submit"
                        className="btn btn-primary mb-3"
                        disabled={authUser?.email === enteredEmail}
                    >Change Email</button>
                </form>
            }

            <div className="form-check mb-2">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="changePassword"
                    onChange={() => setChangePassword(prevState => !prevState)}/>
                <label className="form-check-label" htmlFor="changePassword">
                    Change password
                </label>
            </div>

            { changePassword &&
                <form onSubmit={passwordFormMethods.handleSubmit(handlePasswordChange)}>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text">Password</span>
                        <input
                            type="text"
                            className="form-control"
                            {...passwordFormMethods.register('password')}
                        />
                    </div>
                    {passwordFormMethods.formState.errors.password &&
                        <div className="form-text">{passwordFormMethods.formState.errors.password.message}</div>
                    }
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text">Confirm password</span>
                        <input
                            type="text"
                            className="form-control"
                            {...passwordFormMethods.register('re_password')}/>
                    </div>
                    {passwordFormMethods.formState.errors.re_password &&
                        <div className="form-text">{passwordFormMethods.formState.errors.re_password.message}</div>
                    }
                    <button type="submit"
                            className="btn btn-primary"
                    >Change Password</button>
                </form>
            }
        </div>
    );
};

export {LoginAndSecurity};
