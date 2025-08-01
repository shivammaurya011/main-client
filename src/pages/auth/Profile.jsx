import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import {
  FiEdit,
  FiSave,
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiGlobe,
  FiHome,
  FiBell,
  FiLock,
  FiGitBranch,
  FiLinkedin,
  FiInstagram,
  FiTwitter,
  FiFacebook,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import RootLayout from "../../layout/RootLayout";

const Profile = () => {
  const { user, isAuthenticated, isLoading, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    website: "",
    born: "",
    social: { github: "", linkedin: "", instagram: "", twitter: "", facebook: "" },
    address: { street: "", city: "", state: "", zip: "", country: "" },
    preferences: { notifications: { email: true, sms: false, push: true }, theme: "dark" },
  });

  // Sync formData with user data when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        website: user.website || "",
        born: user.born ? new Date(user.born).toISOString().split("T")[0] : "",
        social: { ...formData.social, ...user.social },
        address: { ...formData.address, ...user.address },
        preferences: { ...formData.preferences, ...user.preferences },
      });
    }
  }, [isAuthenticated, user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // setIsSaving(true);
    // try {
    //   await updateUser(formData);
    //   toast.success("Profile updated successfully");
    //   setIsEditing(false);
    // } catch (error) {
    //   toast.error(error?.message || "Failed to update profile");
    // } finally {
    //   setIsSaving(false);
    // }
  };

  if (isLoading) {
    return (
      <RootLayout>
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading profile...</div>
        </div>
      </RootLayout>
    );
  }

  if (!isAuthenticated) {
    return (
      <RootLayout>
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <p className="text-gray-400">
            Please{" "}
            <Link to="/login" className="text-emerald-400 hover:underline font-medium">
              sign in
            </Link>{" "}
            to view your profile
          </p>
        </div>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <div className="min-h-screen bg-gray-900 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 text-xl font-medium border-2 border-emerald-500/30">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">{user.name}</h1>
                  <p className="text-gray-400 text-sm">
                    {user.role} • {user.status}
                  </p>
                </div>
              </div>
              {/* <button
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isEditing ? "bg-red-500/20 text-red-300 hover:bg-red-500/30" : "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                }`}
              >
                {isEditing ? (
                  <>
                    <FiX className="w-4 h-4" />
                    Cancel
                  </>
                ) : (
                  <>
                    <FiEdit className="w-4 h-4" />
                    Edit Profile
                  </>
                )}
              </button> */}
            </div>
          </div>

          {/* Profile Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                  <FiUser className="w-5 h-5 text-emerald-400" />
                  Personal Information
                </h2>
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          disabled
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Date of Birth</label>
                        <input
                          type="date"
                          name="born"
                          value={formData.born}
                          onChange={handleChange}
                          className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
                    >
                      <FiSave className="w-4 h-4" />
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </form>
                ) : (
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-center gap-2">
                      <FiMail className="w-5 h-5 text-gray-400" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiPhone className="w-5 h-5 text-gray-400" />
                      <span>{user.phone || "Not provided"}</span>
                    </div>
                    {user.bio && <p className="mt-2 leading-relaxed">{user.bio}</p>}
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                  <FiGlobe className="w-5 h-5 text-emerald-400" />
                  Social Profiles
                </h2>
                {isEditing ? (
                  <div className="space-y-3">
                    {[
                      { platform: "github", icon: <FiGitBranch /> },
                      { platform: "linkedin", icon: <FiLinkedin /> },
                      { platform: "twitter", icon: <FiTwitter /> },
                      { platform: "instagram", icon: <FiInstagram /> },
                      { platform: "facebook", icon: <FiFacebook /> },
                    ].map(({ platform, icon }) => (
                      <div key={platform} className="flex items-center gap-2">
                        <span className="text-gray-400 w-5 h-5">{icon}</span>
                        <input
                          type="url"
                          name={`social.${platform}`}
                          value={formData.social[platform]}
                          onChange={handleChange}
                          placeholder={`https://${platform}.com/username`}
                          className="flex-1 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(user.social || {}).map(
                      ([platform, url]) =>
                        url && (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 rounded-lg hover:bg-gray-600 transition-colors text-gray-300"
                          >
                            {{
                              github: <FiGitBranch className="w-5 h-5" />,
                              linkedin: <FiLinkedin className="w-5 h-5 text-blue-400" />,
                              twitter: <FiTwitter className="w-5 h-5 text-sky-400" />,
                              instagram: <FiInstagram className="w-5 h-5 text-pink-400" />,
                              facebook: <FiFacebook className="w-5 h-5 text-blue-400" />,
                            }[platform]}
                            <span className="capitalize">{platform}</span>
                          </a>
                        )
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Address */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                  <FiHome className="w-5 h-5 text-emerald-400" />
                  Address
                </h2>
                {isEditing ? (
                  <div className="space-y-3">
                    {["street", "city", "state", "zip", "country"].map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-300 mb-1 capitalize">{field}</label>
                        <input
                          type="text"
                          name={`address.${field}`}
                          value={formData.address[field]}
                          onChange={handleChange}
                          className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder={`Enter ${field}`}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2 text-gray-300">
                    {user.address?.street && <p>{user.address.street}</p>}
                    <p>{[user.address?.city, user.address?.state, user.address?.zip].filter(Boolean).join(", ")}</p>
                    {user.address?.country && <p>{user.address.country}</p>}
                    {!Object.values(user.address || {}).some(Boolean) && (
                      <p className="text-gray-400">No address provided</p>
                    )}
                  </div>
                )}
              </div>

              {/* Preferences */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                  <FiBell className="w-5 h-5 text-emerald-400" />
                  Preferences
                </h2>
                {isEditing ? (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      {["email", "sms", "push"].map((type) => (
                        <label
                          key={type}
                          className="flex items-center justify-between gap-4 p-2 hover:bg-gray-700 rounded-lg"
                        >
                          <span className="text-sm font-medium text-gray-300 capitalize">{type} Notifications</span>
                          <input
                            type="checkbox"
                            name={`preferences.notifications.${type}`}
                            checked={formData.preferences.notifications[type]}
                            onChange={handleChange}
                            className="h-4 w-4 text-emerald-500 rounded border-gray-600 focus:ring-emerald-500"
                          />
                        </label>
                      ))}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Theme</label>
                      <select
                        name="preferences.theme"
                        value={formData.preferences.theme}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-gray-300">
                    {["email", "sms", "push"].map((type) => (
                      <div key={type} className="flex items-center justify-between">
                        <span className="capitalize">{type} Notifications</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.preferences?.notifications?.[type]
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-red-500/20 text-red-300"
                          }`}
                        >
                          {user.preferences?.notifications?.[type] ? "On" : "Off"}
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                      <span>Theme</span>
                      <span className="capitalize">{user.preferences?.theme || "Dark"}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Security */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                  <FiLock className="w-5 h-5 text-emerald-400" />
                  Security
                </h2>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-center justify-between">
                    <span>Two-Factor Auth</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.twoFactorEnabled ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {user.twoFactorEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <Link
                    to="/security"
                    className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium text-sm"
                  >
                    <FiLock className="w-4 h-4" />
                    Manage Security
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Profile;