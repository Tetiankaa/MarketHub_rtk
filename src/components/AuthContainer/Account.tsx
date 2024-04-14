import {useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux/slices";
import {authService} from "../../services";
import {useEffect} from "react";

const Account = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {authUser} = useAppSelector(state => state.auth);

    useEffect(() => {
        const token = authService.getToken();
        if (token && !authUser){
            dispatch(authActions.getAuthUser());
        }
    }, [authUser, dispatch]);
    const handleLogout = () => {
        navigate('/products');
        authService.removeToken();
        dispatch(authActions.setAuthUser(null));
    }

    return (
        <>
        { authUser &&
            <div>
                <nav className="navbar navbar-expand-sm bg-body-tertiary">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav d-flex flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/myaccount/my-payment-cards">My payment cards</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/myaccount/profile">Contact information</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <button type="button" className="btn btn-dark mt-3" onClick={handleLogout}>Log Out</button>
            </div>
}
        </>
    );
};

export {Account};
