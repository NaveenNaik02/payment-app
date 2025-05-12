import {
  Navigate,
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";
import { observer } from "mobx-react";
import "./App.css";
import { useInjection } from "./providers";
import { MODEL_TYPES } from "./constants";
import type { RootStore } from "./stores";
import { Catalog, LoginPage } from "./pages";

export const App = observer(() => {
  const {
    authStore: { isAuthenticated },
  } = useInjection<RootStore>(MODEL_TYPES.RootStore);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/orders" : "/login"} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/orders"
          element={isAuthenticated ? <Catalog /> : <Navigate to="/login" />}
        />
        <Route path="/order-success" element={<div>order success</div>} />
        <Route path="*" element={<div>not found</div>} />
      </Routes>
    </Router>
  );
});
