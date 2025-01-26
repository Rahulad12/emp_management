import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPages from "./pages/LoginPages";
import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage";
import ProtectedRoute from "./components/ProtectedRoute";
  
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPages />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<WelcomePage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
