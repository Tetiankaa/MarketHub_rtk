import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {categoriesActions, productActions} from "../../redux/slices";
import {StarRating} from "./StarRating";


const ProductInfo = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const {product, priceWithDiscount} = useAppSelector(state => state.product);
    const {thumbnail, title, rating, stock, price,discountPercentage, category, description} = product || {};
    const categoryName = category && `${category.charAt(0).toUpperCase()}${category.slice(1)}`;

    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        if (id) {
            dispatch(productActions.getById({id}));
        }
    }, [dispatch, id]);

    const handleAddingCart = () => {

    }
    return (
        <>
            {product &&
                <>
                    <div className={'d-flex'}>

                        <div>
                            <img src={thumbnail} alt={title} className={'product-image'}/>

                        </div>

                        <div className={'ms-5'}>
                            <div>
                                <h4>{title}</h4>
                                <NavLink
                                    className={'category'}
                                    to={`/category/${category}`}
                                    onClick={() => dispatch(categoriesActions.setSelectedCategory(categoryName))}>
                                    {categoryName}
                                </NavLink>
                                <StarRating readonly={true} rating={rating} size={22}/>

                                {stock === 0 ? <h4 style={{color: 'red'}}>Out of stock</h4> :
                                    <h4 style={{color: 'green'}}>In stock</h4>}
                            </div>


                            <div>
                                <div>
                                    <div className={'d-flex'}>
                                        <p className={'fs-4'}
                                           style={discountPercentage ? {textDecoration: 'line-through'} : {}}>{price} $</p>
                                        {discountPercentage &&
                                            <p className={'fs-4 fw-bold text-danger ms-2'}>{priceWithDiscount} $</p>}
                                    </div>

                                    <div className={'countContainer'}>
                                        <button className={'btn btn-danger'}
                                                onClick={() => setQuantity(prevState => prevState - 1)}
                                                disabled={quantity === 1}>-
                                        </button>
                                        <p className={'fs-4 fw-bold'}>{quantity}</p>
                                        <button className={'btn btn-success'}
                                                onClick={() => setQuantity(prevState => prevState + 1)}>+
                                        </button>
                                    </div>
                                    <button
                                        className={'btn btn-warning fw-bold'}
                                        style={{color: 'white'}}
                                        onClick={() => handleAddingCart()}
                                    ><FontAwesomeIcon icon={faCartShopping}/> Add to cart
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className={'mt-3'}>Description</h3>
                        <p className={'mt-4'}>{description}</p>
                    </div>
                </>

            }
        </>
    );
};

export {ProductInfo};
