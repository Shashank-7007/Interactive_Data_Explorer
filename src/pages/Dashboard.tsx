import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

// ✅ Interfaces for chart data
interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  category: string;
}

interface CategoryData {
  category: string;
  count: number;
}

interface PriceData {
  range: string;
  count: number;
}

interface RatingData {
  category: string;
  avgRating: number;
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("https://dummyjson.com/products?limit=100").then((res) => {
      setProducts(res.data.products || []);
    });
  }, []);

  // ✅ Products per category
  const categoryData: CategoryData[] = Object.values(
    products.reduce((acc: Record<string, CategoryData>, product) => {
      if (!acc[product.category]) {
        acc[product.category] = { category: product.category, count: 0 };
      }
      acc[product.category].count += 1;
      return acc;
    }, {})
  );

  // ✅ Price distribution
  const priceData: PriceData[] = [
    { range: "0-100", count: products.filter((p) => p.price <= 100).length },
    {
      range: "101-500",
      count: products.filter((p) => p.price > 100 && p.price <= 500).length,
    },
    {
      range: "501-1000",
      count: products.filter((p) => p.price > 500 && p.price <= 1000).length,
    },
    { range: "1000+", count: products.filter((p) => p.price > 1000).length },
  ];

  // ✅ Average rating per category
  const ratingData: RatingData[] = Object.values(
    products.reduce((acc: Record<string, { total: number; count: number }>, product) => {
      if (!acc[product.category]) {
        acc[product.category] = { total: 0, count: 0 };
      }
      acc[product.category].total += product.rating;
      acc[product.category].count += 1;
      return acc;
    }, {})
  ).map((c: any) => ({
    category: c.category,
    avgRating: Number((c.total / c.count).toFixed(2)),
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a855f7"];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📊 Product Insights Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie chart: Products per category */}
        <motion.div
          className="bg-white p-4 shadow rounded-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-lg font-semibold mb-4">Products by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData as any}
                dataKey="count"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {categoryData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar chart: Price distribution */}
        <motion.div
          className="bg-white p-4 shadow rounded-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold mb-4">Price Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priceData}>
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar chart: Average rating per category */}
        <motion.div
          className="bg-white p-4 shadow rounded-lg md:col-span-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold mb-4">
            Average Rating by Category
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ratingData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgRating" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
