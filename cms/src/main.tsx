import { createRoot } from "react-dom/client";
import "./assets/css/global.css";
import RouterConfig from "./config/router.config";
import { StrictMode } from "react";
import AuthProvider from "./context/provider/auth.provider";
import { Provider } from "react-redux";
import { store } from "./config/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterConfig />
      </AuthProvider>
    </Provider>
  </StrictMode>,
);
