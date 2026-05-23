import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductTable from "../../../components/admin/products/ProductTable";
import {
  deleteProductService,
  getAllProductsService,
} from "../../../services/productService";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProductsService();
      setProducts(data.body || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProductsService();

        if (active) {
          setProducts(data.body || []);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product ?")) return;

    try {
      await deleteProductService(id);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Products</h1>

            <p className="text-gray-500 mt-2">Manage all products</p>
          </div>

          <Link
            to="/admin/products/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-lg"
          >
            + Create Product
          </Link>
        </div>

        <ProductTable products={products} onDelete={handleDelete} loading={loading} />
      </div>
    </div>
  );
};

export default ProductList;
