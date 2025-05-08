import {
  Navigate,
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";
import "./App.css";
import { LoginForm } from "./pages";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/orders" element={<div>orders</div>} />
        <Route path="/order-success" element={<div>order success</div>} />
        <Route path="*" element={<div>not found</div>} />
      </Routes>
    </Router>
  );
};
