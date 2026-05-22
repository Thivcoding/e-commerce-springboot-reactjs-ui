import { useState } from "react";

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
});

const CategoryForm = ({ initialData, onSubmit, loading }) => {
  const [form, setForm] = useState(() => getInitialForm(initialData));

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
      ...(name === "name" && !initialData ? { slug: makeSlug(value) } : {}),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      name: form.name,
      slug: form.slug,
      description: form.description,
    });
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

      <button
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Loading..." : "Save Category"}
      </button>
    </form>
  );
};

export default CategoryForm;
