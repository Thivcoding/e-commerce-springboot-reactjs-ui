import{ useEffect, useState } from "react";

const UserForm = ({ initialData, onSubmit, loading }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
    image: null,
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        password: "",
        role: initialData.role || "USER",
        image: null,
      });

      setPreview(initialData.imageUrl || "");
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm({
        ...form,
        image: files[0],
      });

      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("role", form.role);

    if (form.password) {
      formData.append("password", form.password);
    }

    if (form.image) {
      formData.append("image", form.image);
    }

    onSubmit(formData);
  };

  return (
    <form className="bg-white shadow-xl rounded-2xl p-8 space-y-5" onSubmit={handleSubmit}>
      
      {/* NAME */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Name
        </label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* EMAIL */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Password
        </label>

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ROLE */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Role
        </label>

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>

      {/* IMAGE */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Image
        </label>

        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-2"
        />
      </div>

      {/* PREVIEW */}
      {preview && (
        <div className="flex justify-center">
          <img
            src={preview}
            alt="preview"
            className="w-32 h-32 rounded-2xl object-cover shadow-lg"
          />
        </div>
      )}

      {/* BUTTON */}
      <button
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
      >
        {loading ? "Loading..." : "Save User"}
      </button>
    </form>
  );
};

export default UserForm;