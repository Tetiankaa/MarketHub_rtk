import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {productActions} from "../../redux/slices";
import {Product} from "./Product";


const Products = () =>{
   const dispatch = useAppDispatch();
   const {products,total} = useAppSelector(state => state.product);
    const [skipLimitValues, setSkipLimitValues] = useState<{skip:number,limit:number}>({skip:0,limit:30});


    useEffect(() => {
          dispatch(productActions.getAll(skipLimitValues));

        const handleScroll = () => {
            //height of the viewport + amount scrolled down >= height of the entire document, including content not visible within the viewport due to scrolling.
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
                setSkipLimitValues(prevState => ({
                    skip: prevState.skip,
                    limit: Math.min(prevState.limit + 30,total)
                }))
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [dispatch, skipLimitValues, total]);

    return (
        <div>
            {products.map(product=><Product product={product} key={product.id}/>)}

        </div>
    );
}

export {Products}