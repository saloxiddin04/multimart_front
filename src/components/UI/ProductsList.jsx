import React from 'react';
import ProductCard from "./ProductCard";

function ProductsList({data}) {
    return (
        <>
            {data && data?.map((item) => (
                <ProductCard item={item} key={item.id}/>
            ))}
        </>
    );
}

export default ProductsList;
