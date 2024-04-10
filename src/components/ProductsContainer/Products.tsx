import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {productActions} from "../../redux/slices";
import {Product} from "./Product";
import {Pagination} from "../PaginationContainer";
import {ISkipLimitValues} from "../../interfaces";


const Products = () =>{

   const dispatch = useAppDispatch();

   const {products,total, searchValue, isLoading, totalPages, limitPerPage} = useAppSelector(state => state.product);

    const [skipLimitValues, setSkipLimitValues] = useState<ISkipLimitValues>({skip:0,limit:limitPerPage});

    const [query, setQuery] = useSearchParams({page:'1'});
    const page = +query.get("page");


    useEffect(() => {
        setSkipLimitValues({...skipLimitValues,
            skip: (page - 1) * limitPerPage,
            limit: limitPerPage
        });
    }, [page,searchValue]);

    useEffect(() => {

            if (searchValue) {
                dispatch(productActions.searchProducts({ search: searchValue, skip: skipLimitValues.skip, limit: skipLimitValues.limit }));
            } else {
                dispatch(productActions.getAll({skip: skipLimitValues.skip, limit: skipLimitValues.limit }));

        }
    }, [dispatch, searchValue, skipLimitValues]);


    return (
        <>
            {<Pagination page={page} totalPages={totalPages} totalItems={total} skipLimitValues={skipLimitValues} onSetSkipLimit={setSkipLimitValues} setQuery={setQuery} limitPerPage={limitPerPage}/>}

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
