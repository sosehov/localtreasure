import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

const EditProfile = () => {
  const { user, token } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    address: "",
    phone_number: "",
    avatar_url: "",
    password: "",
  });

  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
        address: user.address || "",
        contact_info: user.contact_info || "",
        avatar_url: user.avatar_url || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      const result = await res.json();
      setStatus("Profile updated!");
    } catch (err) {
      console.error(err);
      setStatus("Failed to update profile.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      {status && (
        <p className={`mb-4 text-sm ${status.includes("failed") ? "text-red-500" : "text-green-600"}`}>
          {status}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded px-3 py-2"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Bio</label>
          <textarea
            name="bio"
            className="w-full border rounded px-3 py-2"
            value={formData.bio}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input
            type="text"
            name="address"
            className="w-full border rounded px-3 py-2"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Contact Info</label>
          <input
            type="text"
            name="contact_info"
            className="w-full border rounded px-3 py-2"
            value={formData.contact_info}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Avatar URL</label>
          <input
            type="text"
            name="avatar_url"
            className="w-full border rounded px-3 py-2"
            value={formData.avatar_url}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">New Password</label>
          <input
            type="password"
            name="password"
            className="w-full border rounded px-3 py-2"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
