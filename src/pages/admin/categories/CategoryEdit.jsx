import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import CategoryForm from "../../../components/admin/categories/CategoryForm";
import {
  getCategoryByIdService,
  updateCategoryService,
} from "../../../services/categoryService";

const CategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchCategory = async () => {
      try {
        const data = await getCategoryByIdService(id);

        if (active) {
          setCategory(data.body);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategory();

    return () => {
      active = false;
    };
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      setLoading(true);
      await updateCategoryService(id, data);
      navigate("/admin/categories");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Edit Category</h1>

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
        {category && (
          <CategoryForm
            key={category.id}
            initialData={category}
            onSubmit={handleUpdate}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryEdit;
