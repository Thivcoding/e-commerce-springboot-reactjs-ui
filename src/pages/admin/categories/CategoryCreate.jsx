import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import CategoryForm from "../../../components/admin/categories/CategoryForm";
import { createCategoryService } from "../../../services/categoryService";

const CategoryCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (data) => {
    try {
      setLoading(true);
      await createCategoryService(data);
      navigate("/admin/categories");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Create Category</h1>

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
        <CategoryForm onSubmit={handleCreate} loading={loading} />
      </div>
    </div>
  );
};

export default CategoryCreate;
