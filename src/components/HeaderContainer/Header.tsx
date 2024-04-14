import {useEffect} from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faUser} from "@fortawesome/free-solid-svg-icons";

import {authActions, categoriesActions, productActions} from "../../redux/slices";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {ISearch} from "../../interfaces";
import {authService} from "../../services";
import {router} from "../../router";


const Header = () => {
    const dispatch =  useAppDispatch();
    const {pathname} = useLocation();

    const {categories,selectedCategory} = useAppSelector(state => state.categories);
    const {authUser, isLoading:isLoadingUser} = useAppSelector(state => state.auth);

    const navigate = useNavigate();

    const {register, reset, handleSubmit} = useForm<ISearch>();

    const [query, setQuery] = useSearchParams({page:'1', query:''});

    useEffect(() => {
        dispatch(categoriesActions.getAll());
    }, [dispatch]);

    useEffect(() => {
     const token = authService.getToken();
       if (token && !authUser){
           dispatch(authActions.getAuthUser());
       }
    }, [authUser, dispatch]);


    const handleCategoryClick = (category:string) => {
        navigate(`/category/${category}`)
        dispatch(categoriesActions.setSelectedCategory(category));
    };

    const handleSearch:SubmitHandler<ISearch> = (value) =>{
        if (pathname !== '/products'){
            router.navigate('/products');
        }
        setQuery(prev => {
            prev.set('page',`${1}`);
            prev.set('query',value.search)
            return prev;
        })
        dispatch(productActions.setSearchValue(value.search));
        reset();


    }

    return (
        <>
            <div className={"container-fluid navbar navbar-expand-md bg-body-tertiary"}>
                <nav className="navbar navbar-expand-lg bg-body-tertiary container-lg">
                    <div className="container-fluid">
                        <p className="navbar-brand mt-3 ">MarketHub</p>

                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link" href="/products">Home</a>
                                </li>

                                <div className="nav-item dropdown">
                                    <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                        {selectedCategory ? selectedCategory : 'Categories'}
                                    </button>
                                    <ul className="dropdown-menu">
                                        {categories.map(category => <li key={category}><a className={'dropdown-item'}
                                                                                          onClick={() => handleCategoryClick(category)}>{category}</a>
                                        </li>)}
                                    </ul>
                                </div>

                                {<li className="nav-item">
                                    {
                                        isLoadingUser
                                        ? ''
                                        : authUser
                                            ? <a className="nav-link" href="/myaccount"><FontAwesomeIcon icon={faUser} />  {authUser.firstName}</a>
                                            : <a className="nav-link" href="/account/login">Login</a>
                                    }
                                    </li>
                                }

                            </ul>
                            {(pathname === '/products' || pathname.startsWith('/category')) &&
                                <form className="d-flex" role="search" onSubmit={handleSubmit(handleSearch)}>
                                    <input className="form-control me-2" type="search" placeholder="Search"
                                           aria-label="Search" {...register('search')}/>
                                    <button className="btn btn-outline-info" type="submit"><FontAwesomeIcon
                                        icon={faMagnifyingGlass}/></button>
                                </form>}

                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export {Header};
