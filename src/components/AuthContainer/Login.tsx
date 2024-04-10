import {useAppDispatch, useAppSelector} from "../../hooks";
import {SubmitHandler, useForm} from "react-hook-form";
import {ICredentials, ISearch} from "../../interfaces";
import {authActions} from "../../redux/slices";
import {useState} from "react";
import {useNavigate, useNavigation} from "react-router-dom";

const Login = () => {
   const dispatch = useAppDispatch();
  const {isLoading,error,authUser} = useAppSelector(state => state.auth);

  const navigate = useNavigate();

    const {register, handleSubmit} = useForm<ICredentials>();

    const [isCheck, setIsCheck] = useState<boolean>(false);
    const handleLogin:SubmitHandler<ICredentials> = (value) =>{
        dispatch(authActions.login(value));
        navigate('/products');
    }
    return (
        <div className={'d-flex justify-content-center'} >
            <form className={"w-25"} onSubmit={handleSubmit(handleLogin)}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" aria-describedby="emailHelp" {...register('username')} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type={isCheck ? "text" :"password"} className="form-control" required {...register('password')} />
                    <div className={'mt-1'}>
                        <input type="checkbox" placeholder={"Show"} id={'showPassword'} onChange={()=>setIsCheck(prevState => !prevState)}/>
                        <label className={'ms-1'} htmlFor={'showPassword'}>Show Password</label>
                    </div>
                </div>

                <div className="mb-3 mt-3">
                    <a href="/account/forgotpassword" className={''}>Forgot your password?</a>
                </div>

                <button type="submit" className="btn btn-primary form-control">Log in</button>

                <div className={'mb-3 mt-3 d-flex justify-content-center'}>
                    <p >Don't have an account yet? <a href={'/account/register'} className={'font-weight-bold'}><b>Register</b></a></p>
                </div>
            </form>
        </div>
    );
};

export {Login};
