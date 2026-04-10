import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Movie from "../pages/Movie";
import Anime from "../pages/tvshow";
import Profile from "../pages/Profile";
import SavedMovies from "../pages/Saved";

const routes = [
    {label: "/", element: <Home />},
    {label: "/movies", element: <Movie />},
    {label: "/tv", element: <Anime />},
    {label: "/saved", element: <SavedMovies />},
    {label: "/profile", element: <Profile />},
]

export default function NavRouting() {
    return (
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} path={route.label} element={route.element} />
            ))}
        </Routes>
    )
}