const baseURL = 'https://dummyjson.com';

const products = "/products";
const categories = "/categories";
const category = "/category";
const search = "/search";

const urls = {
    products:{
        base:products,
        search:`${products}/${search}`
    },
    categories:{
        base:`${products}/${categories}`,
        byCategoryName:(name:string)=>`${products}/${category}/${name}`
    },

}


export {
    baseURL,
    urls
}