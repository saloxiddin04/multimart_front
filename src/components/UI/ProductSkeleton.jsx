import React from "react";
import "../../App.css";
const ProductSkeleton = ({ page }) => {
    return (
        <div
            className={
                page === "home"
                    ? "col-xl-2 col-lg-3 col-md-4 col-6"
                    : "col-lg-3 col-md-4 col-6"
            }
        >
            <div className="product-box skeleton"></div>
            <div className="product-title">
                {Array(2)
                    .fill("")
                    .map((_, i) => (
                        <span key={i} className="skeleton"></span>
                    ))}
            </div>
            <div className="product-price skeleton"></div>
        </div>
    );
};

export default ProductSkeleton;
