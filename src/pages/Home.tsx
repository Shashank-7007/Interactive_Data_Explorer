import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import ProductDetail from "../components/ProductDetail";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  stock: number;
}

interface Category {
  slug: string;
  name: string;
  url: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [page, setPage] = useState<number>(1);
  const limit = 8;

  // Product detail modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch products
  const fetchProducts = async (category?: string, pageNum: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      let url = `https://dummyjson.com/products?limit=${limit}&skip=${
        (pageNum - 1) * limit
      }`;

      if (category) {
        url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${
          (pageNum - 1) * limit
        }`;
      }

      const res = await axios.get(url);
      setProducts(res.data.products || []);
    } catch (err) {
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products/categories");
      setCategories(res.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchProducts("", 1);
    fetchCategories();
  }, []);

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setPage(1);
    fetchProducts(value, 1);
  };

  // Handle sorting
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);

    let sorted = [...products];
    if (value === "price-asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (value === "price-desc") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (value === "title-asc") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (value === "title-desc") {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    }

    setProducts(sorted);
  };

  // Pagination
  const handleNext = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(selectedCategory, nextPage);
  };

  const handlePrev = () => {
    if (page === 1) return;
    const prevPage = page - 1;
    setPage(prevPage);
    fetchProducts(selectedCategory, prevPage);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <span>📊</span> Interactive Data Explorer
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border rounded px-4 py-2"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={handleSort}
          className="border rounded px-4 py-2"
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="title-asc">Name: A → Z</option>
          <option value="title-desc">Name: Z → A</option>
        </select>
      </div>

      {/* Products */}
      {loading ? (
        <p className="text-lg">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-11/12">
          <AnimatePresence>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-white shadow rounded-lg p-4 flex flex-col items-center transition cursor-pointer"
                onClick={() => setSelectedProduct(product)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }} 
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-32 h-32 object-cover mb-3 rounded"
                />
                <h2 className="font-semibold text-center">{product.title}</h2>
                <p className="text-gray-600">${product.price}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Pagination */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            page === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 rounded bg-blue-500 text-white"
        >
          Next
        </button>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
