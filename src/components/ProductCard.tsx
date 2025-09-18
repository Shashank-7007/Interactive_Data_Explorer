// src/components/ProductCard.tsx
import React from "react";

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    thumbnail: string;
    category: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300 flex flex-col">
      {/* Product Image */}
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover"
      />

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.title}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
          {product.description}
        </p>

        <div className="mt-auto">
          <p className="mt-2 text-gray-700">
            <span className="font-bold">₹{product.price}</span>
          </p>
          <p className="text-sm text-yellow-500">⭐ {product.rating}</p>
          <p className="text-xs text-gray-500 italic mt-1">
            {product.category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
