import {FC} from "react";
import {Rating} from "react-simple-star-rating";

interface IProps{
    readonly:boolean,
    rating:number,
    size:number
}
const StarRating:FC<IProps> = ({readonly, rating, size}) => {
    return (
        <div>
            <Rating readonly={readonly} initialValue={rating} allowFraction={true} iconsCount={5} size={size} fillColor={"#f1d145"} emptyColor={'#726d6d'}/> <span className="badge text-bg-light">{rating}</span>
        </div>
    );
};

export {StarRating};