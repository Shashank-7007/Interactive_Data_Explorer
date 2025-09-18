import { useEffect, useState } from "react";
import { fetchProducts } from "../utils/api";

export default function useProducts(limit: number = 12) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const getProducts = async () => {
      setLoading(true);
      setError(null);

      const data = await fetchProducts(skip, limit);

      if (!cancelled) {
        if (data && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
          setError("No products found.");
        }
        setLoading(false);
      }
    };

    getProducts();

    return () => {
      cancelled = true;
    };
  }, [skip, limit]);

  return { products, loading, error, skip, setSkip, limit };
}
