// src/components/ProductDetail.tsx
import React from "react";
import { motion } from "framer-motion";

interface ProductDetailProps {
  product: any;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg max-w-2xl w-full relative overflow-y-auto max-h-[90vh]"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✖
        </button>

        {/* Product content */}
        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>

        {/* Product images */}
        <div className="flex gap-2 overflow-x-auto mb-4">
          {product.images?.map((img: string, index: number) => (
            <img
              key={index}
              src={img}
              alt={product.title}
              className="w-32 h-32 object-cover rounded"
            />
          ))}
        </div>

        <p>
          <span className="font-semibold">Brand:</span> {product.brand}
        </p>
        <p>
          <span className="font-semibold">Category:</span> {product.category}
        </p>
        <p>
          <span className="font-semibold">Stock:</span> {product.stock}
        </p>
        <p>
          <span className="font-semibold">Rating:</span> ⭐ {product.rating}
        </p>
        <p className="text-xl font-bold mt-3">${product.price}</p>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetail;
