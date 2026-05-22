import { useEffect, useState } from "react";
import { getAllCategoriesService } from "../../../services/categoryService";

const makeSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getInitialForm = (initialData) => ({
  name: initialData?.name || "",
  slug: initialData?.slug || "",
  description: initialData?.description || "",
  price: initialData?.price ?? "",
  stock: initialData?.stock ?? "",
  categoryId: initialData?.categoryId || "",
  images: [],
});

const getInitialPreviews = (initialData) =>
  (initialData?.images || []).map((image) => image.imageUrl);

const ProductForm = ({ initialData, onSubmit, loading }) => {
  const [form, setForm] = useState(() => getInitialForm(initialData));
  const [categories, setCategories] = useState([]);
  const [previews, setPreviews] = useState(() => getInitialPreviews(initialData));

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategoriesService();
        setCategories(data.body || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    return () => {
      previews.forEach((preview) => {
        if (preview.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [previews]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      const selectedFiles = Array.from(files || []);

      setForm({
        ...form,
        images: selectedFiles,
      });

      setPreviews(selectedFiles.map((file) => URL.createObjectURL(file)));
      return;
    }

    setForm({
      ...form,
      [name]: value,
      ...(name === "name" && !initialData ? { slug: makeSlug(value) } : {}),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("slug", form.slug);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("categoryId", form.categoryId);

    form.images.forEach((image) => {
      formData.append("images", image);
    });

    onSubmit(formData);
  };

  return (
    <form className="bg-white shadow-xl rounded-2xl p-8 space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-2 font-medium text-gray-700">Name</label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">Slug</label>

        <input
          type="text"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">Description</label>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Price</label>

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Stock</label>

          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            min="0"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">Category</label>

        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">Images</label>

        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-2"
        />
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {previews.map((preview, index) => (
            <img
              key={`${preview}-${index}`}
              src={preview}
              alt={`Product preview ${index + 1}`}
              className="h-28 w-full rounded-2xl object-cover shadow-lg"
            />
          ))}
        </div>
      )}

      <button
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Loading..." : "Save Product"}
      </button>
    </form>
  );
};

export default ProductForm;
