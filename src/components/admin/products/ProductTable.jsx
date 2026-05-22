import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const SkeletonRow = () => {
  return (
    <tr className="border-t animate-pulse">
      <td className="p-4">
        <div className="h-4 w-6 bg-gray-300 rounded"></div>
      </td>

      <td className="p-4">
        <div className="h-14 w-20 bg-gray-300 rounded-xl"></div>
      </td>

      <td className="p-4">
        <div className="h-4 w-32 bg-gray-300 rounded"></div>
      </td>

      <td className="p-4">
        <div className="h-4 w-20 bg-gray-300 rounded"></div>
      </td>

      <td className="p-4">
        <div className="h-4 w-16 bg-gray-300 rounded"></div>
      </td>

      <td className="p-4">
        <div className="h-4 w-24 bg-gray-300 rounded"></div>
      </td>

      <td className="p-4">
        <div className="flex justify-center gap-3">
          <div className="h-8 w-16 bg-gray-300 rounded-xl"></div>
          <div className="h-8 w-16 bg-gray-300 rounded-xl"></div>
        </div>
      </td>
    </tr>
  );
};

const ProductTable = ({ products, onDelete, loading }) => {
  // =========================
  // STATE
  // =========================
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 5;

  // =========================
  // GET UNIQUE CATEGORY
  // =========================
  const categories = [
    "ALL",
    ...new Set(products.map((p) => p.categoryName).filter(Boolean)),
  ];

  // =========================
  // FILTER PRODUCTS
  // =========================
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.slug?.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        categoryFilter === "ALL" ||
        product.categoryName === categoryFilter;

      return matchSearch && matchCategory;
    });
  }, [products, search, categoryFilter]);

  // =========================
  // PAGINATION
  // =========================
  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-5">

      {/* ========================= */}
      {/* SEARCH + FILTER */}
      {/* ========================= */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-5">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 px-4 py-2 rounded-xl w-full md:w-80 outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* CATEGORY FILTER */}
        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* ========================= */}
      {/* TABLE */}
      {/* ========================= */}
      <div className="overflow-x-auto">
        <table className="w-full">

          {/* HEADER */}
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <SkeletonRow key={index} />
              ))
            ) : currentProducts.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="p-8 text-center text-gray-500"
                >
                  No products found
                </td>
              </tr>
            ) : (
              currentProducts.map((product) => {
                const firstImage =
                  product.images?.[0]?.imageUrl;

                return (
                  <tr
                    key={product.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4">{product.id}</td>

                    <td className="p-4">
                      {firstImage ? (
                        <img
                          src={firstImage}
                          alt={product.name}
                          className="h-14 w-20 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-20 items-center justify-center rounded-xl bg-gray-100 text-xs font-bold text-gray-400">
                          No Image
                        </div>
                      )}
                    </td>

                    <td className="p-4">
                      <p className="font-medium">
                        {product.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {product.slug}
                      </p>
                    </td>

                    <td className="p-4 text-gray-600">
                      $
                      {Number(product.price || 0).toFixed(2)}
                    </td>

                    <td className="p-4 text-gray-600">
                      {product.stock}
                    </td>

                    <td className="p-4 text-gray-600">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {product.categoryName}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-xl"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            onDelete(product.id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ========================= */}
      {/* PAGINATION */}
      {/* ========================= */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">

          {/* PREV */}
          <button
            disabled={currentPage === 1}
            onClick={() =>
              handlePageChange(currentPage - 1)
            }
            className={`px-4 py-2 rounded-xl border ${
              currentPage === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Prev
          </button>

          {/* PAGE NUMBER */}
          {Array.from({ length: totalPages }).map(
            (_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  onClick={() =>
                    handlePageChange(page)
                  }
                  className={`px-4 py-2 rounded-xl border ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            }
          )}

          {/* NEXT */}
          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              handlePageChange(currentPage + 1)
            }
            className={`px-4 py-2 rounded-xl border ${
              currentPage === totalPages
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Next
          </button>

        </div>
      )}
    </div>
  );
};

export default ProductTable;