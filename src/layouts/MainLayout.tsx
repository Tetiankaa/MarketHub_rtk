import {Outlet} from "react-router-dom";

import {Header} from "../components";

const MainLayout = () => {
    return (
        <div>
            <Header/>
            <div className={"container-lg shadow p-3 mb-5"} style={{background:"rgba(208, 234, 241, 0.8)", height: '100vh'}}><Outlet/></div>
        </div>
    );
};

export {MainLayout};
