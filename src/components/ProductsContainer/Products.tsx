import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {productActions} from "../../redux/slices";
import {Product} from "./Product";
import {useSearchParams} from "react-router-dom";


const Products = () =>{
   const dispatch = useAppDispatch();
   const {products,total, searchValue, isLoading, totalPages} = useAppSelector(state => state.product);

    const [skipLimitValues, setSkipLimitValues] = useState<{skip:number,limit:number}>({skip:0,limit:16});

    const [query, setQuery] = useSearchParams({page:'1'});
    const page = query.get("page");


    useEffect(() => {
        if (searchValue) {
            dispatch(productActions.searchProducts({ search: searchValue }));
        } else {
            dispatch(productActions.getAll(skipLimitValues));
        }
    }, [dispatch, skipLimitValues, searchValue]);

        const previousPage = () =>{
            setSkipLimitValues(prevState => ({
                skip: prevState.skip - prevState.limit,
                limit: Math.min(prevState.limit, total - prevState.skip)
            }));
            setQuery(prev => {
                prev.set("page",`${+page - 1}`);
                return prev;
            });
        }

        const nextPage = () =>{
            setSkipLimitValues(prevState => ({
                skip: prevState.skip + prevState.limit,
                limit: Math.min(prevState.limit, total - prevState.skip)
            }));
            setQuery(prev => {
                prev.set("page",`${+page + 1}`);
                return prev;
            });
        }
    return (
        <>
            {
                <div className={"d-flex justify-content-center"}>
                    <nav>
                        <ul className="pagination">
                            <li className={`page - item`}>
                                <button className="page-link" disabled={page === "1"} onClick={previousPage}>Previous</button>
                            </li>

                            {<li className="page-item"><a className="page-link" href="#">1</a></li>}

                            <li className="page-item">
                                <button className="page-link" disabled={page === totalPages} onClick={nextPage}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            }

            {isLoading
                ? (<div className={"d-flex justify-content-center"}>
                    <div className="spinner-border text-info" role="status" style={{width: "4rem", height: "4rem"}}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>)
                : products.length !== 0
                    ? (<div className={"row"}>{products.map(product => <Product product={product} key={product.id}/>)}</div>)
                    : (<div className="alert alert-primary d-flex justify-content-center" role="alert">
                            No products found
                        </div>
                   )}


        </>

    );
}

export {Products}