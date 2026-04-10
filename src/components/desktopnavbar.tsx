import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Bookmark, Clapperboard, HomeIcon, Monitor, Search, User, X } from "lucide-react";
import { useState } from "react";
import ndopflix from "../assets/ndopflix.png";
import SearchBar from "./search";
import { ThemeToggle, useTheme } from "./theme";

export default function MobileNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showSearch, setShowSearch] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const activePath = location.pathname === "/anime" ? "/tv" : location.pathname;
  const searchTerm = searchParams.get("query") ?? "";

  const handleSearch = (term: string) => {
    const targetPath = activePath === "/tv" ? "/tv" : "/movies";

    navigate(term ? `${targetPath}?query=${encodeURIComponent(term)}` : targetPath);
    setShowSearch(false);
  };

  const navItems = [
    { id: "home", label: "Home", icon: <HomeIcon />, path: "/" },
    { id: "movies", label: "Movies", icon: <Clapperboard />, path: "/movies" },
    { id: "tv", label: "TV Show", icon: <Monitor />, path: "/tv" },
    { id: "saved", label: "Saved", icon: <Bookmark />, path: "/saved" },
    { id: "profile", label: "Profile", icon: <User />, path: "/profile" },
  ];

  return (
    <>
      <div
        className={`fixed top-0 right-0 left-0 z-50 border-b backdrop-blur md:hidden ${
          isDark
            ? "border-slate-800 bg-slate-950/85 text-white"
            : "border-slate-200 bg-white/85 text-slate-900"
        }`}
        onMouseLeave={() => setShowSearch(false)}
      >
        <nav className="z-50 flex items-center justify-between px-1 py-1 md:hidden">
          <div className="flex items-center space-x-1">
            <img src={ndopflix} alt="Ndopflix Logo" className="h-12 w-auto" />
            <span className="text-2xl font-bold text-blue-600">
              <span className="text-red-600">Ndop</span>flix
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2 pr-1">
            {!showSearch ? (
              <Search
                className={`cursor-pointer transition-colors duration-200 ease-in-out ${
                  isDark ? "text-gray-300 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"
                }`}
                onClick={() => setShowSearch(true)}
                onMouseEnter={() => setShowSearch(true)}
              />
            ) : (
              <X
                className={`cursor-pointer transition-colors duration-200 ease-in-out ${
                  isDark ? "text-gray-300 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"
                }`}
                onClick={() => setShowSearch(false)}
              />
            )}
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </div>
        </nav>

        {showSearch ? (
          <div className="px-4 py-2">
            <SearchBar
              OnSearch={handleSearch}
              initialValue={searchTerm}
            />
          </div>
        ) : null}
      </div>

      <nav
        className={`fixed right-0 bottom-0 left-0 z-50 flex justify-around border-t py-2 backdrop-blur md:hidden ${
          isDark
            ? "border-slate-800 bg-slate-950/85 text-white"
            : "border-slate-200 bg-white/85 text-slate-900"
        }`}
      >
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`flex flex-col items-center transition-colors duration-200 ${
              activePath === item.path
                ? "text-blue-500"
                : isDark
                  ? "text-gray-300"
                  : "text-gray-600"
            }`}
          >
            {item.icon}
            <span className="text-[14px] font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}