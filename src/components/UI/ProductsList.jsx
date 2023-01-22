import React from 'react';
import ProductCard from "./ProductCard";

function ProductsList({data, loading, visible}) {
    return (
        <>
            {data && data?.slice(0, visible).map((item) => (
                <ProductCard item={item} loading={loading} key={item.id}/>
            ))}
        </>
    );
}

export default ProductsList;
