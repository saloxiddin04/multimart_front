import React from 'react';
import ProductCard from "./ProductCard";

function ProductsList({data, loading}) {
    return (
        <>
            {data && data?.map((item) => (
                <ProductCard item={item} loading={loading} key={item.id}/>
            ))}
        </>
    );
}

export default ProductsList;
