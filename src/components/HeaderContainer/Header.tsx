import {useEffect} from "react";

import {categoriesActions} from "../../redux/slices";
import {useAppDispatch, useAppSelector} from "../../hooks";

const Header = () => {
  const dispatch =  useAppDispatch();
    const {categories} = useAppSelector(state => state.categories);

    useEffect(() => {
        dispatch(categoriesActions.getAll());
    }, [dispatch]);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <p className="navbar-brand mt-3 ">MarketHub</p>

                    <div className="collapse navbar-collapse" >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active"  href="/products">Home</a>
                            </li>

                            <div className="nav-item dropdown">
                                <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    Categories
                                </button>
                                <ul className="dropdown-menu">
                                    {categories.map(category=><li key={category}><a className={'dropdown-item'} href={`/category/${category}`}>{category}</a></li>)}
                                </ul>
                            </div>

                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>

                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>

                    </div>
                </div>
            </nav>
        </>
    );
};

export {Header};