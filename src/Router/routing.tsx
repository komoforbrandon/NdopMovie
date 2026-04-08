import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Movie from "../pages/Movie";
import Anime from "../pages/Anime";
import Profile from "../pages/Profile";
import SavedMovies from "../pages/Saved";

const routes = [{path: "/", element: <Home />}, 
    {path: "/movie", element: <Movie />}, 
    {path: "/anime", element: <Anime />}, 
    {path: "/profile", element: <Profile />}, 
    {path: "/saved", element: <SavedMovies />}]

export default function Routing() {
  return (
    <Routes>
        {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
        ))}
    </Routes>
  )
}