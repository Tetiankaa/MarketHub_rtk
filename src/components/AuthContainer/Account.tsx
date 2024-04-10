import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux/slices";
import {authService} from "../../services";

const Account = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        navigate('/products');
        authService.removeToken();
        dispatch(authActions.setAuthUser(null));
    }


    return (
        <div>
            <button type="button" className="btn btn-dark" onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export {Account};
