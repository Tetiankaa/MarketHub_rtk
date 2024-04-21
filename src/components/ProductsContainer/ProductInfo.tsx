import {useLocation, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {productActions} from "../../redux/slices";

const ProductInfo = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const {product} = useAppSelector(state => state.product);
    console.log(product)
    useEffect(() => {
        if (id){
            dispatch(productActions.getById({id}));
        }
    }, [dispatch, id]);
    return (
        <div>
            prodcut ibnfo
        </div>
    );
};

export {ProductInfo};
