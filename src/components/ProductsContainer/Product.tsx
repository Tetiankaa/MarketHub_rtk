import {FC} from "react";
import {useNavigate} from "react-router-dom";

import {IProduct} from "../../interfaces";
import {StarRating} from "./StarRating";
import {useAppSelector} from "../../hooks";

interface IProps{
    product:IProduct
}
const Product:FC<IProps> = ({product}) => {
    const {title,id, images, category, brand, discountPercentage, price, rating, stock, thumbnail, description} = product;
    const priceWithDiscount =  discountPercentage && +(price - (price * (discountPercentage / 100))).toFixed(2);
    const displayTitle = title.length > 20 ? title.substring(0,18) + "..." : title;

    const navigate = useNavigate();

    const handleProductClick = (id:number) => {
        navigate(`/products/${id}`);
    }
    return (
        <>
            <div className={"col-md-3 mb-2 mt-2"} style={{cursor:'pointer'}} id={'product'} onClick={()=>handleProductClick(id)}>
                <div className="card">
                    <div style={{ paddingBottom: "70%", position: "relative" }}>
                        <img src={thumbnail} className="card-img-top" alt={title} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div className="card-body">
                        <p className="card-text" data-bs-toggle="tooltip" data-bs-placement="bottom" title={title}>{displayTitle}</p>

                        <StarRating readonly={true} rating={rating} size={22}/>
                        <p className="fw-bold fs-5 text-primary-emphasis mt-2" style={discountPercentage ? {textDecoration:'line-through'} : {}}>{price} $</p>
                        {discountPercentage &&
                            <p className={'fs-4 fw-bold text-danger'}>{priceWithDiscount} $</p>}
                    </div>
                </div>
            </div>
        </>
    );
};

export {Product};
