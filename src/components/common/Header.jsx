import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLogoutMutation } from "../../api/apiSlice";
import { toast } from "react-toastify";
import { 
  FiMenu, 
  FiX, 
  FiChevronDown, 
  FiHome, 
  FiUser, 
  FiLogOut 
} from "react-icons/fi";
import config from "../../config/env";

// Static data
const PLATFORMS = [
  { name: "Hire", path: "/platforms/hire", color: "emerald", desc: "AI Recruitment Suite for Enterprises" },
  { name: "Campus", path: "/platforms/campus", color: "blue", desc: "Student Training & Placement Platform" },
  { name: "Career", path: "/platforms/career", color: "orange", desc: "AI Career Coach for Professionals" },
];

const NAV_ITEMS = ["Solutions", "Resources", "Company"];

const COLOR_CLASSES = {
  emerald: { bg: "bg-emerald-600", bgLight: "bg-emerald-600/20", text: "text-emerald-400", hoverText: "hover:text-emerald-400" },
  blue: { bg: "bg-blue-600", bgLight: "bg-blue-600/20", text: "text-blue-400", hoverText: "hover:text-blue-400" },
  orange: { bg: "bg-orange-600", bgLight: "bg-orange-600/20", text: "text-orange-400", hoverText: "hover:text-orange-400" },
};

const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  
  // State management
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlatformsOpen, setIsPlatformsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Memoized functions
  const closeMenus = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsPlatformsOpen(false);
    setIsProfileDropdownOpen(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logout().unwrap();
      toast.success("Logged out successfully");
      navigate("/login");
      closeMenus();
    } catch (error) {
      toast.error(`Logout failed: ${error?.data?.message || "Unknown error"}`);
    }
  }, [logout, navigate, closeMenus]);

  const handlePlatformEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsPlatformsOpen(true);
  }, []);

  const handlePlatformLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setIsPlatformsOpen(false), 200);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
    setIsPlatformsOpen(false); // Ensure other dropdowns close
    setIsProfileDropdownOpen(false);
  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest(".mobile-menu-toggle")) {
        closeMenus();
      }
    };
    if (isMobileMenuOpen || isPlatformsOpen || isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen, isPlatformsOpen, isProfileDropdownOpen, closeMenus]);

  // Platform path based on user role
  const getPlatformPath = useCallback((role) => {
    switch (role?.toLowerCase()) {
      case "hire": return config.platforms.hireUrl;
      case "campus": return config.platforms.campusUrl;
      case "career": return config.platforms.careerUrl;
      default: return "/";
    }
  }, []);

  const getColorClasses = (color) => COLOR_CLASSES[color] || COLOR_CLASSES.emerald;

  return (
    <header className="bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group" onClick={closeMenus}>
          <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            PremacAI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <div
            className="relative dropdown"
            onMouseEnter={handlePlatformEnter}
            onMouseLeave={handlePlatformLeave}
          >
            <button className="flex items-center space-x-1 text-gray-300 hover:text-emerald-400 px-3 py-2 rounded-md transition-colors duration-200">
              <span>Platforms</span>
              <FiChevronDown className="text-gray-400 group-hover:text-emerald-400" />
            </button>
            {isPlatformsOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-gray-900 rounded-xl shadow-xl border border-gray-800 p-4 z-50">
                <h3 className="text-sm text-gray-400 mb-2 font-medium">PremacAI Ecosystem</h3>
                {PLATFORMS.map((platform) => {
                  const colorClass = getColorClasses(platform.color);
                  return (
                    <Link
                      key={platform.name}
                      to={platform.path}
                      className={`block p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 group`}
                      onClick={closeMenus}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`h-8 w-8 ${colorClass.bgLight} rounded-md flex items-center justify-center`}>
                          <span className={`${colorClass.text} font-semibold`}>{platform.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className={`text-base font-medium text-gray-300 ${colorClass.hoverText}`}>{platform.name}</p>
                          <p className="text-xs text-gray-400">{platform.desc}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-gray-300 hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 group relative"
              onClick={closeMenus}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
            </Link>
          ))}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {isLoading ? (
            <div className="text-gray-400 text-sm animate-pulse">Loading...</div>
          ) : isAuthenticated ? (
            <div className="relative dropdown">
              <button
                onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
                className="flex items-center space-x-2 hover:text-emerald-400 transition-colors duration-200 group"
              >
                <div className="h-9 w-9 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-medium">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <span className="hidden sm:inline text-gray-100 font-medium truncate max-w-[120px]">{user?.name || "User"}</span>
                <FiChevronDown className="text-gray-400 group-hover:text-emerald-400" />
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-900 rounded-xl shadow-xl border border-gray-800">
                  <div className="p-4 border-b border-gray-800">
                    <p className="text-gray-100 font-medium truncate">{user?.name || "User"}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email || "No email"}</p>
                  </div>
                  <div className="py-2">
                    <Link
                      to={getPlatformPath(user?.role)}
                      target="_blank"
                      className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-emerald-400 transition-colors duration-200"
                      onClick={closeMenus}
                    >
                      <FiHome className="mr-2 w-4 h-4" />
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-emerald-400 transition-colors duration-200"
                      onClick={closeMenus}
                    >
                      <FiUser className="mr-2 w-4 h-4" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center text-left px-4 py-2 text-red-400 hover:bg-gray-800 transition-colors duration-200"
                    >
                      <FiLogOut className="mr-2 w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors duration-200 text-sm font-medium"
                onClick={closeMenus}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-md hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
                onClick={closeMenus}
              >
                Get Started
              </Link>
            </div>
          )}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-emerald-400 transition-colors duration-200 mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden bg-gray-900 border-b border-gray-800 absolute top-full max-h-screen left-0 w-full z-40 overflow-y-auto" 
          ref={mobileMenuRef}
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="border-b border-gray-800 pb-4">
              <h3 className="text-sm text-gray-400 font-medium mb-2 px-2">Platforms</h3>
              {PLATFORMS.map((platform) => {
                const colorClass = getColorClasses(platform.color);
                return (
                  <Link
                    key={platform.name}
                    to={platform.path}
                    className={`block py-2 px-4 text-gray-300 ${colorClass.hoverText} hover:bg-gray-800 rounded-md transition-colors duration-200`}
                    onClick={closeMenus}
                  >
                    {platform.name}
                  </Link>
                );
              })}
            </div>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="block py-2 px-4 text-gray-300 hover:text-emerald-400 hover:bg-gray-800 rounded-md transition-colors duration-200"
                onClick={closeMenus}
              >
                {item}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-800">
              {isLoading ? (
                <div className="px-4 py-2 text-gray-400 text-sm animate-pulse">Loading...</div>
              ) : isAuthenticated ? (
                <>
                  <div className="px-4 py-2 text-sm">
                    <p className="text-gray-100 font-medium truncate">{user?.name || "User"}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email || "No email"}</p>
                  </div>
                  <Link
                    to={getPlatformPath(user?.role)}
                    className="flex items-center py-2 px-4 text-gray-300 hover:text-emerald-400 hover:bg-gray-800 rounded-md transition-colors duration-200"
                    onClick={closeMenus}
                  >
                    <FiHome className="mr-2 w-4 h-4" />
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center py-2 px-4 text-gray-300 hover:text-emerald-400 hover:bg-gray-800 rounded-md transition-colors duration-200"
                    onClick={closeMenus}
                  >
                    <FiUser className="mr-2 w-4 h-4" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center text-left py-2 px-4 text-red-400 hover:bg-gray-800 rounded-md transition-colors duration-200"
                  >
                    <FiLogOut className="mr-2 w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="block py-2 px-4 text-gray-300 hover:text-emerald-400 hover:bg-gray-800 rounded-md transition-colors duration-200 text-center"
                    onClick={closeMenus}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block py-2 px-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-md hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200 text-center"
                    onClick={closeMenus}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;