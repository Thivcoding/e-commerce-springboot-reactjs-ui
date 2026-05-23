import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import ProductForm from "../../../components/admin/products/ProductForm";
import { createProductService } from "../../../services/productService";

const ProductCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData) => {
    try {
      setLoading(true);
      await createProductService(formData);
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
        <h1 className="text-4xl font-bold">Create Product</h1>

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
        <ProductForm onSubmit={handleCreate} loading={loading} />
      </div>
    </div>
  );
};

export default ProductCreate;
