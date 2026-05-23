import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import ProductForm from "../../../components/admin/products/ProductForm";
import {
  getProductByIdService,
  updateProductService,
} from "../../../services/productService";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchProduct = async () => {
      try {
        const data = await getProductByIdService(id);

        if (active) {
          setProduct(data.body);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();

    return () => {
      active = false;
    };
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      setLoading(true);
      await updateProductService(id, formData);
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Edit Product</h1>

        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-red-500 px-6 py-3 text-sm font-black text-white cursor-pointer transition hover:-translate-y-0.5 hover:bg-red-600"
        >
          <FaArrowLeft />
          Go back
        </button>
      </div>

      <div className="max-w-lg mx-auto mt-8">
        {product && (
          <ProductForm
            key={product.id}
            initialData={product}
            onSubmit={handleUpdate}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default ProductEdit;
