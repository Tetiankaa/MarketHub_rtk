import {NavLink, useNavigate} from "react-router-dom";
import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux/slices";
import {authService} from "../../services";


const Account = () => {

    const INFO_PATH = '/myaccount/info';
    const PAYMENT_CARDS_PATH = '/myaccount/my-payment-cards';
    const LOGIN_SECURITY = '/myaccount/login-and-security';

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {authUser,activePage} = useAppSelector(state => state.auth);

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
                <nav className="navbar navbar-expand-sm bg-body-tertiary" >
                    <div className="container-fluid" style={{background:"rgba(208, 234, 241, 0.8)"}}>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className={`navbar-nav d-flex flex-column`} >
                                <li className="nav-item" >
                                    <NavLink
                                       className={`nav-link ${activePage === PAYMENT_CARDS_PATH ? 'active' :''}`}
                                       aria-current="page"
                                       to={PAYMENT_CARDS_PATH}
                                       onClick={()=> dispatch(authActions.setActivePage(PAYMENT_CARDS_PATH))}
                                    >My payment cards</NavLink>

                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className={`nav-link ${activePage === INFO_PATH ? 'active' :''}`}
                                        to={INFO_PATH}
                                        onClick={()=> dispatch(authActions.setActivePage(INFO_PATH))}
                                    >Contact information</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className={`nav-link ${activePage === LOGIN_SECURITY ? 'active' :''}`}
                                        to={LOGIN_SECURITY}
                                        onClick={()=> dispatch(authActions.setActivePage(LOGIN_SECURITY))}
                                    >Login and Security</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <button
                    type="button"
                    className="btn btn-dark mt-3"
                    onClick={handleLogout}
                >Log Out</button>
            </div>
}
        </>
    );
};

export {Account};
