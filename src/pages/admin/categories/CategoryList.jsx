import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryTable from "../../../components/admin/categories/CategoryTable";
import {
  deleteCategoryService,
  getAllCategoriesService,
} from "../../../services/categoryService";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getAllCategoriesService();
      setCategories(data.body || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await getAllCategoriesService();

        if (active) {
          setCategories(data.body || []);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadCategories();

    return () => {
      active = false;
    };
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category ?")) return;

    try {
      await deleteCategoryService(id);
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Categories</h1>

            <p className="text-gray-500 mt-2">Manage all categories</p>
          </div>

          <Link
            to="/admin/categories/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-lg"
          >
            + Create Category
          </Link>
        </div>

        <CategoryTable
          categories={categories}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default CategoryList;
