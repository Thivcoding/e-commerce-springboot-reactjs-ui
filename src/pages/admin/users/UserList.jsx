import{ useEffect, useState } from "react";

import { Link } from "react-router-dom";

import UserTable from "../../../components/admin/users/UserTable";
import {
  deleteUserService,
  getAllUsersService,
} from "../../../services/userService";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const data = await getAllUsersService();
      // console.log(data.body);

      setUsers(data.body);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    
    if (!window.confirm("Delete this user ?")) return;

    try {
      await deleteUserService(id);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Users
            </h1>

            <p className="text-gray-500 mt-2">
              Manage all users
            </p>
          </div>

          <Link
            to="/admin/users/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-lg"
          >
            + Create User
          </Link>
        </div>

        {/* LOADING UI */}

          <UserTable users={users} onDelete={handleDelete} loading={loading} />

      </div>
    </div>
  );
};

export default UserList;