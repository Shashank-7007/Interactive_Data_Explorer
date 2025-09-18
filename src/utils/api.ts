const API_URL = "https://dummyjson.com";

export async function fetchProducts(skip = 0, limit = 12) {
  try {
    const res = await fetch(`${API_URL}/products?limit=${limit}&skip=${skip}`);
    if (!res.ok) throw new Error("Network error");
    const data = await res.json();
    return data && Array.isArray(data.products) ? data : { products: [] };
  } catch (err) {
    console.error("fetchProducts error:", err);
    return { products: [] };
  }
}

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_URL}/products/categories`);
    if (!res.ok) throw new Error("Network error");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("fetchCategories error:", err);
    return [];
  }
}

export async function fetchByCategory(category: string) {
  try {
    const res = await fetch(`${API_URL}/products/category/${category}`);
    if (!res.ok) throw new Error("Network error");
    const data = await res.json();
    return data && Array.isArray(data.products) ? data : { products: [] };
  } catch (err) {
    console.error("fetchByCategory error:", err);
    return { products: [] };
  }
}
