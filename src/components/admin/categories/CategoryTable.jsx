import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const SkeletonRow = () => {
  return (
    <tr className="border-t animate-pulse">
      <td className="p-4">
        <div className="h-4 w-6 bg-gray-300 rounded"></div>
      </td>

      <td className="p-4">
        <div className="h-4 w-32 bg-gray-300 rounded"></div>
      </td>

      <td className="p-4">
        <div className="h-4 w-28 bg-gray-300 rounded"></div>
      </td>

      <td className="p-4">
        <div className="h-4 w-56 bg-gray-300 rounded"></div>
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

const CategoryTable = ({
  categories,
  onDelete,
  loading,
}) => {

  // =========================
  // STATE
  // =========================
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const categoriesPerPage = 5;

  // =========================
  // FILTER CATEGORY
  // =========================
  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      return (
        category.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        category.slug
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        category.description
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [categories, search]);

  // =========================
  // PAGINATION
  // =========================
  const totalPages = Math.ceil(
    filteredCategories.length / categoriesPerPage
  );

  const startIndex =
    (currentPage - 1) * categoriesPerPage;

  const currentCategories =
    filteredCategories.slice(
      startIndex,
      startIndex + categoriesPerPage
    );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-5">

      {/* ========================= */}
      {/* SEARCH */}
      {/* ========================= */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 px-4 py-2 rounded-xl w-full md:w-80 outline-none focus:ring-2 focus:ring-blue-400"
        />
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
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Slug</th>
              <th className="p-4 text-left">
                Description
              </th>
              <th className="p-4 text-center">
                Action
              </th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map(
                (_, index) => (
                  <SkeletonRow key={index} />
                )
              )
            ) : currentCategories.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="p-8 text-center text-gray-500"
                >
                  No categories found
                </td>
              </tr>
            ) : (
              currentCategories.map((category) => (
                <tr
                  key={category.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    {category.id}
                  </td>

                  <td className="p-4 font-medium">
                    {category.name}
                  </td>

                  <td className="p-4 text-gray-600">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {category.slug}
                    </span>
                  </td>

                  <td className="p-4 text-gray-600">
                    <p className="max-w-md truncate">
                      {category.description || "-"}
                    </p>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/admin/categories/edit/${category.id}`}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-xl"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          onDelete(category.id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
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

export default CategoryTable;