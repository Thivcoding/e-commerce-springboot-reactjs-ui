import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import {
  getUserByIdService,
  updateUserService,
} from "../../../services/userService";
import {
  FaEdit,
  FaUser,
  FaEnvelope,
  FaLock,
  FaSave,
  FaTimes,
} from "react-icons/fa";

const ProfilePage = () => {
  const { user, token , updateUser  } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [profileData, setProfileData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    imageUrl: "",
  });

  const [formData, setFormData] = useState({ ...profileData });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // LOAD PROFILE
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);

        if (user?.id && token) {
          const res = await getUserByIdService(user.id);
          const profile = res?.body ?? res;

          const clean = { ...profile, password: "" };

          setProfileData(clean);
          setFormData(clean);
        }
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user, token]);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // IMAGE CHANGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // SAVE PROFILE
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);
      setError(null);

      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);

      if (formData.password) {
        form.append("password", formData.password);
      }

      if (imageFile) {
        form.append("image", imageFile);
      }

      const res = await updateUserService(user.id, form);
      const updated = res?.body ?? res;


      updateUser(updated); 
      
      const clean = { ...updated, password: "" };

      setProfileData(clean);
      setFormData(clean);

      setImageFile(null);
      setPreview(null);

      setIsEditing(false);
      setSuccess("Profile updated successfully");

      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
    setImageFile(null);
    setPreview(null);
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Please login to continue</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">My Profile</h1>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                <FaEdit /> Edit
              </button>
            )}
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-600 mt-2">{success}</p>}
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">

          {/* AVATAR */}
          <div className="flex flex-col items-center gap-4 pb-6 border-b">

            <div className="relative">
              <img
                src={preview || profileData.imageUrl || user?.imageUrl}
                className="w-24 h-24 rounded-full object-cover border"
                alt="profile"
              />

              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full text-white cursor-pointer">
                  <FaEdit size={12} />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            <div className="text-center">
              <h2 className="text-lg font-bold">{profileData.name}</h2>
              <p className="text-sm text-gray-500">{profileData.email}</p>
            </div>
          </div>

          {loading ? (
            <p className="text-center py-10 text-gray-500">
              Loading...
            </p>
          ) : (
            <form onSubmit={handleSave} className="mt-6 space-y-5">

              {/* NAME */}
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <FaUser /> Name
                </label>

                {isEditing ? (
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full mt-1 border px-4 py-2 rounded-lg"
                  />
                ) : (
                  <p className="mt-1">{profileData.name}</p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <FaEnvelope /> Email
                </label>

                {isEditing ? (
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mt-1 border px-4 py-2 rounded-lg"
                  />
                ) : (
                  <p className="mt-1">{profileData.email}</p>
                )}
              </div>

              {/* PASSWORD */}
              {isEditing && (
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <FaLock /> Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full mt-1 border px-4 py-2 rounded-lg"
                  />
                </div>
              )}

              {/* BUTTONS */}
              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={updating}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-lg"
                  >
                    {updating ? "Saving..." : "Save"}
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-200 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              )}

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;