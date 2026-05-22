import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const SkeletonRow = () => {
  return (
    <tr className="border-t animate-pulse">
      <td className="p-4">
        <div className="h-4 w-6 bg-gray-300 rounded"></div>
      </td>

      <td className="p-4">
        <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
      </td>

      <td className="p-4">
        <div className="h-4 w-24 bg-gray-300 rounded"></div>
      </td>

      <td className="p-4">
        <div className="h-4 w-32 bg-gray-300 rounded"></div>
      </td>

      <td className="p-4">
        <div className="h-4 w-16 bg-gray-300 rounded"></div>
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

const UserTable = ({ users, onDelete, loading }) => {
  // =========================
  // STATE
  // =========================
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;

  // =========================
  // FILTER USERS
  // =========================
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchRole =
        roleFilter === "ALL" || user.role === roleFilter;

      return matchSearch && matchRole;
    });
  }, [users, search, roleFilter]);

  // =========================
  // PAGINATION
  // =========================
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const startIndex = (currentPage - 1) * usersPerPage;

  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
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
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 px-4 py-2 rounded-xl w-full md:w-80 outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* ROLE FILTER */}
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="ALL">All Roles</option>
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
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
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <SkeletonRow key={index} />
              ))
            ) : currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">{user.id}</td>

                  <td className="p-4">
                    <img
                      src={user.imageUrl}
                      alt=""
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  </td>

                  <td className="p-4 font-medium">{user.name}</td>

                  <td className="p-4 text-gray-600">{user.email}</td>

                  <td className="p-4 text-gray-600">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.role === "ADMIN"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/admin/users/edit/${user.id}`}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-xl"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => onDelete(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-500"
                >
                  No users found
                </td>
              </tr>
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
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 rounded-xl border ${
              currentPage === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Prev
          </button>

          {/* PAGE NUMBER */}
          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;

            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-xl border ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            );
          })}

          {/* NEXT */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
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

export default UserTable;