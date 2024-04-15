import {Outlet} from "react-router-dom";

import {Account} from "../components/AuthContainer/Account";


const AccountPage = () => {
    return (
        <div>
            <div className={'row'}>
                <div className={'col'}><Account/></div>
                <div className={'col'}><Outlet/></div>
            </div>
        </div>
    );
};

export {AccountPage};
