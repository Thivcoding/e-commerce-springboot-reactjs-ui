import { useState, useEffect } from "react";
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
  //   FaLoader,
} from "react-icons/fa";

const ProfilePage = () => {
  const { user, token } = useAuth();
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
    profileImage: "",
  });

  const [formData, setFormData] = useState({ ...profileData });

  // Load user profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        if (user?.id && token) {
          const response = await getUserByIdService(user.id);
          const profile = response?.body ?? response;
          setProfileData({ ...profile, password: "" });
          setFormData({ ...profile, password: "" });
        }
      } catch (err) {
        setError("Failed to load profile. Please try again.");
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const buildProfileFormData = (data) => {
    const formPayload = new FormData();
    const allowedFields = ["name", "email", "password"];

    allowedFields.forEach((field) => {
      if (field === "password") {
        if (data.password) {
          formPayload.append(field, data.password);
        }
      } else if (data[field] !== undefined) {
        formPayload.append(field, data[field] ?? "");
      }
    });

    return formPayload;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setError("Name and email are required.");
      return;
    }

    try {
      setUpdating(true);
      setError(null);

      const payload = buildProfileFormData(formData);
      const response = await updateUserService(user.id, payload);
      const updatedProfile = response?.body ?? response;

      setProfileData(updatedProfile);
      setFormData(updatedProfile);
      setIsEditing(false);
      setSuccess("Profile updated successfully!");

      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      console.error("Error updating profile:", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
    setError(null);
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Please log in
          </h2>
          <p className="text-gray-600">
            You need to be logged in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
              >
                <FaEdit size={16} /> Edit Profile
              </button>
            )}
          </div>

          {/* Status Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2">
              <span>⚠️</span>
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2">
              <span>✓</span>
              {success}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            {/* <FaLoader className="animate-spin text-indigo-600 text-3xl mx-auto mb-4" /> */}
            <p className="text-gray-600">Loading profile...</p>
          </div>
        ) : (
          <form onSubmit={handleSave}>
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
              {/* Profile Image Section */}
              <div className="border-b pb-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white flex-shrink-0">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      src={user?.imageUrl}
                      alt={user?.name}
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-2xl font-bold text-gray-800">
                      {profileData.name}
                    </p>
                    <p className="text-gray-600">{profileData.email}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      ID: {profileData.id}
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaUser className="inline mr-2" /> Full Name *
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                      required
                    />
                  ) : (
                    <p className="px-4 py-2 text-gray-800 bg-gray-50 rounded-lg">
                      {profileData.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaEnvelope className="inline mr-2" /> Email *
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                      required
                    />
                  ) : (
                    <p className="px-4 py-2 text-gray-800 bg-gray-50 rounded-lg">
                      {profileData.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaLock className="inline mr-2" /> Password
                  </label>
                  {isEditing ? (
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter new password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    />
                  ) : (
                    <p className="px-4 py-2 text-gray-800 bg-gray-50 rounded-lg">
                      ********
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    type="submit"
                    disabled={updating}
                    className="flex items-center justify-center gap-2 flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition duration-200 font-medium"
                  >
                    {updating ? (
                      <>
                        {/* <FaLoader className="animate-spin" size={16} />{" "} */}
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave size={16} /> Save Changes
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={updating}
                    className="flex items-center justify-center gap-2 flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 disabled:opacity-50 transition duration-200 font-medium"
                  >
                    <FaTimes size={16} /> Cancel
                  </button>
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
