import {useParams, useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect, useState} from "react";
import {productActions} from "../../redux/slices";
import {ISkipLimitValues} from "../../interfaces";
import {Pagination} from "../PaginationContainer";
import {Product} from "./Product";

const ProductsByCategory = () => {

    const {name} = useParams();

    const dispatch = useAppDispatch();

    const {products,total, isLoading, totalPages, limitPerPage} = useAppSelector(state => state.product);

    const [skipLimitValues, setSkipLimitValues] = useState<ISkipLimitValues>({skip:0,limit:16});

    const [query, setQuery] = useSearchParams({page:'1'});
    const page = +query.get("page");

    useEffect(() => {
        if (name != null){
            dispatch(productActions.getByCategoryName({category: name,skip:skipLimitValues.skip, limit:skipLimitValues.limit}))
        }
    }, [name, dispatch]);

    useEffect(() => {
        setSkipLimitValues({...skipLimitValues,
            skip: (page - 1) * limitPerPage,
            limit: page === totalPages ? limitPerPage : Math.min(limitPerPage, total - skipLimitValues.skip)
        });
    }, [page]);

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

};

export {ProductsByCategory};
