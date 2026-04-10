import { BrowserRouter } from "react-router-dom";
import NavRouting from "./Router/routing";
import MobileNavbar from "./components/mobilenavbar";
import DesktopNavbar from "./components/desktopnavbar";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <DesktopNavbar />
          <NavRouting />
          <MobileNavbar />
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
