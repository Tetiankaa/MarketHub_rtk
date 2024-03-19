import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect} from "react";
import {productActions} from "../../redux/slices";
import {Product} from "./Product";

const ProductsByCategory = () => {

    const {name} = useParams();

    const dispatch = useAppDispatch();

    const {products} = useAppSelector(state => state.product);

    useEffect(() => {
        if (name != null){
            dispatch(productActions.getByCategoryName({category: name}))
        }
    }, [name, dispatch]);


    return (
        <div>
            {products.map(product=><Product product={product} key={product.id}/>)}
        </div>
    );
};

export {ProductsByCategory};