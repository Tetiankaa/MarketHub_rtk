const baseURL = 'https://dummyjson.com';

const products = "/products";
const categories = "/categories";
const category = "/category";
const search = "/search";
const auth = "/auth";
const users = "/users";


const urls = {
    products:{
        base:products,
        search:`${products}/${search}`
    },
    categories:{
        base:`${products}/${categories}`,
        byCategoryName:(name:string)=>`${products}/${category}/${name}`
    },
    auth:{
        login:`${auth}/login`,
        user:`${auth}/me`,
        refresh:`${auth}/refresh`
    },
    users:{
        add:`${users}/add`,
        update:(id:number)=>`${users}/${id}`
    }

}


export {
    baseURL,
    urls
}
