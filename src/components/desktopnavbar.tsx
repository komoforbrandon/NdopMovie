import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { User, Search } from "lucide-react";
import SearchBar from "./search";
import { ThemeToggle, useTheme } from "./theme";
import { useState } from "react";

export default function DesktopNavbar() {
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isDark, toggleTheme } = useTheme();
  const searchTerm = searchParams.get("query") ?? "";

  function getSearchPath() {
    if (location.pathname === "/tv") {
      return "/tv";
    }

    if (location.pathname === "/movies") {
      return "/movies";
    }

    return "/";
  }

  function handleSearch(query: string) {
     navigate(`${getSearchPath()}?query=${encodeURIComponent(query)}`);
  }

  const navItems = [
    { id: "home", label: "Home",  path: "/" },
    { id: "movies", label: "Movies", path: "/movies" },
    { id: "tv", label: "TV Shows", path: "/tv" },
    { id: "saved", label: "My List", path: "/saved" },
  ];

  return (
    <div className={`sticky top-0 z-50 hidden items-center justify-between border-b px-6 py-2 shadow-md backdrop-blur md:flex ${
        isDark
          ? "border-slate-800 bg-slate-950/85 text-white"
          : "border-slate-200 bg-white/85 text-slate-900"
      }
    `}>
    <nav
      className={` items-center justify-between w-full  py-2 md:container md:max-w-full md:mx-auto md:flex`}
    >
      <div className="flex items-center space-x-4">
        <span className="text-2xl font-bold text-red-600"><span className="text-red-600">Net</span>Flix</span>
          {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`flex items-center space-x-1 font-bold transition-colors duration-200 ease-in-out active:underline active:underline-offset-4 focus:border-b-3 focus:border-red-500 ${
              location.pathname === item.path
                ? ""
                : isDark
                  ? "text-gray-300 hover:text-red-400  focus:text-(--text)"
                  : "text-gray-600 hover:text-red-600 focus:text-(--text)"
            }`}
          >
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="flex space-x-6">
        <div className="flex items-center space-x-4">
        <div className="flex transform transition-transform duration-200 ease-in-out">
         {showSearch && <SearchBar OnSearch={handleSearch} initialValue={searchTerm} />}
        </div>
          <Search size={23} onClick={() => setShowSearch(!showSearch)} />
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          <Link
            to="/profile"
            className={`flex items-center space-x-1 transition-colors duration-200 ${
              isDark ? "hover:text-blue-400" : "hover:text-blue-600"
            }`}
          >
            <User />
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </nav>
    </div>
  );
}   
