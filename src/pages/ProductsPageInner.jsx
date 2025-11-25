import React, { useEffect, useState } from 'react'
import CacheAxios from '../CacheAxios'
import ProductCard from '../components/ProductCard';

const ProductsPageInner = ({ _id }) => {
    console.log(_id);
    const [products, setProducts] = useState([])

    useEffect(() => {
        if (_id == "all") {
            CacheAxios.get(`${import.meta.env.VITE_API_URL}/products?page=1&limit=10&populate=true`).then((res) => {
                console.log(res.data);
                setProducts(res.data.products);
            })
        } else {
            CacheAxios.get(`${import.meta.env.VITE_API_URL}/categories/${_id}?populate=true`).then((res) => {
                console.log(res.data);
                setProducts(res.data.products);
            })
        }
    }, [_id])

    useEffect(() => {
        console.log(products);

    }, [products])
    return (
        <>
            {
                products.map((pp) => (
                    <ProductCard product={pp} />
                ))
            }


        </>
    )
}

export default ProductsPageInner