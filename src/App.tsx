import { BrowserRouter } from "react-router-dom";
import NavRouting from "./Router/routing";
import MobileNavbar from "./components/mobilenavbar";
import DesktopNavbar from "./components/desktopnavbar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DesktopNavbar />
        <NavRouting />
        <MobileNavbar />
      </BrowserRouter>
    </div>
  );
}

export default App;
