import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import { getAllProductsService } from "../../services/productService";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProductsService();

        const result = data?.body ?? data;

        if (!Array.isArray(result)) return;

        setProducts(result.slice(-4).reverse());
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id || product._id}
          product={product}
        />
      ))}
    </div>
  );
};

export default NewArrivals;