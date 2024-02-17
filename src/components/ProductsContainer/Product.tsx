import {IProduct} from "../../interfaces";

import {FC} from "react";

interface IProps{
    product:IProduct
}
const Product:FC<IProps> = ({product}) => {
    const {title,id} = product;
    return (
        <div>
            <p>{id}</p>
        <p>{title}</p>
        </div>
    );
};

export {Product};