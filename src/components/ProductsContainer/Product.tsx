import {IProduct} from "../../interfaces";

import {FC, FocusEventHandler, useState} from "react";
import {StarRating} from "./StarRating";

interface IProps{
    product:IProduct
}
const Product:FC<IProps> = ({product}) => {
    const {title,id, images, category, brand, discountPercentage, price, rating, stock, thumbnail, description} = product;

    const displayTitle = title.length > 20 ? title.substring(0,18) + "..." : title;

    return (
        <>
            <div className={"col-md-3 mb-2 mt-2"} style={{cursor:'pointer'}}>
                <div className="card">
                    <div style={{ paddingBottom: "70%", position: "relative" }}>
                        <img src={thumbnail} className="card-img-top" alt={title} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div className="card-body">
                        <p className="card-text" data-bs-toggle="tooltip" data-bs-placement="bottom" title={title}>{displayTitle}</p>

                        <StarRating readonly={true} rating={rating} size={22}/>
                        <p className="fw-bold fs-5 text-primary-emphasis mt-2">{price} $</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export {Product};