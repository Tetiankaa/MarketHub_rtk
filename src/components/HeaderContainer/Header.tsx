import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

import {categoriesActions, productActions} from "../../redux/slices";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {ISearch} from "../../interfaces";

const Header = () => {
  const dispatch =  useAppDispatch();
    const {categories,selectedCategory} = useAppSelector(state => state.categories);

    const navigate = useNavigate();

    const {register, reset, handleSubmit} = useForm<ISearch>();


    useEffect(() => {
        dispatch(categoriesActions.getAll())
    }, [dispatch]);

    const handleCategoryClick = (category:string) => {
        navigate(`/category/${category}`)
        dispatch(categoriesActions.setSelectedCategory(category));
    };

    const handleSearch:SubmitHandler<ISearch> = (value) =>{
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
                                    <a className="nav-link active" href="/products">Home</a>
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

                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>

                            </ul>

                            <form className="d-flex" role="search" onSubmit={handleSubmit(handleSearch)}>
                                <input className="form-control me-2" type="search" placeholder="Search"
                                       aria-label="Search" {...register('search')}/>
                                <button className="btn btn-outline-info" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                            </form>

                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export {Header};