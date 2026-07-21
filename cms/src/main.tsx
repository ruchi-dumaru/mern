import { createRoot } from "react-dom/client";
import "./assets/css/global.css";
import RouterConfig from "./config/router.config";
import { StrictMode } from "react";
import AuthProvider from "./context/provider/auth.provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
<RouterConfig />
    </AuthProvider>
    
  </StrictMode>,
);
