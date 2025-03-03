import {BrowserRouter} from 'react-router-dom';
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AdminContextProvider from "./context/AdminContext.jsx";
import CounselorContextProvider from "./context/CounselorContext.jsx";
import AppContextProvider from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <CounselorContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </CounselorContextProvider>
    </AdminContextProvider>
    </BrowserRouter>
  
);
