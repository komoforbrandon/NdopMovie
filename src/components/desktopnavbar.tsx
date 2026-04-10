import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { User } from "lucide-react";
import ndopflixlogo from "../assets/ndopflix.png";
import SearchBar from "./search";
import { ThemeToggle, useTheme } from "./theme";

export default function DesktopNavbar() {
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
    { id: "saved", label: "Saved", path: "/saved" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 hidden items-center justify-between border-b px-6 py-2 shadow-md backdrop-blur md:flex ${
        isDark
          ? "border-slate-800 bg-slate-950/85 text-white"
          : "border-slate-200 bg-white/85 text-slate-900"
      }`}
    >
      <div className="flex items-center space-x-4">
        <img src={ndopflixlogo} alt="Ndopflix Logo" className="h-12 w-auto mr-3" />
        <span className="text-2xl font-bold text-blue-600"><span className="text-red-600">Ndop</span>flix</span>
          {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`flex items-center space-x-1 font-medium transition-colors duration-200 ease-in-out hover:underline hover:underline-offset-4 ${
              location.pathname === item.path
                ? "text-blue-500"
                : isDark
                  ? "text-gray-300 hover:text-blue-400"
                  : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
         <SearchBar OnSearch={handleSearch} initialValue={searchTerm} />
      <div className="flex space-x-6">
        <div className="flex items-center space-x-4">
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
  );
}   
