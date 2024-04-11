import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {forgotPasswordValidator} from "../../validators";


const ForgotPassword = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const {register,reset, formState:{isValid, errors}} = useForm<{email: string}>({mode:'all',resolver:joiResolver(forgotPasswordValidator)});

    return (
        <div className={'d-flex flex-column justify-content-center align-items-center'} >
            <div className={'border border-info rounded-4 p-3'}>

                <div className={'w-30'}>
                    <h1>Forgot your password?</h1>
                    <p>Enter your account email address. We will send you a link to set your password.</p>
                </div>

                <div className={'w-50'} >
                    <form>
                        <div className={'mb-3'}>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                {...register('email')}
                                required/>
                            {errors.email &&
                                <div className="alert alert-danger" role="alert">
                                    {errors.email.message}
                                </div>
                            }
                            <button
                                    type="submit"
                                    className="btn btn-primary form-control mt-3"
                                    onClick={(event)=> {
                                        event.preventDefault();
                                        setShowModal(true);
                                        reset();
                                    }}
                                    disabled={!isValid}>
                                Send
                            </button>

                        </div>
                    </form>

                </div>
                        {showModal &&
                            <div className="alert alert-success w-30" role="alert">
                                We've sent you an email. If you don't see it, please check your spam folder.
                            </div>}
            </div>


        </div>

    );
};

export {ForgotPassword};
