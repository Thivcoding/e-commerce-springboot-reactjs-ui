import UserForm from "../../../components/admin/users/UserForm";

import { useNavigate, useParams } from "react-router-dom";
import {
  getUserByIdService,
  updateUserService,
} from "../../../services/userService";
import { FaArrowLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";

const UserEdit = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const data = await getUserByIdService(id);

      setUser(data.body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUpdate = async (formData) => {
    try {
      setLoading(true);

      await updateUserService(id, formData);

      navigate("/admin/users");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Edit User</h1>

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
        {user && (
          <UserForm
            initialData={user}
            onSubmit={handleUpdate}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default UserEdit;
