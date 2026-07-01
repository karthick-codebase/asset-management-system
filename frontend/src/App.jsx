import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import Employees from "./pages/Employees";
import Categories from "./pages/Categories";
import History from "./pages/History";
import Reports from "./pages/Reports";
import AssetDetails from "./pages/AssetDetails";
import CreateAsset from "./pages/CreateAssets";
import EditAsset from "./pages/EditAsset";
import CreateEmployee from "./components/CreateEmployee";
import EditEmployee from "./components/EditEmployee";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/assets/:id" element={<AssetDetails />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/history" element={<History />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/assets/create" element={<CreateAsset />} />
          <Route path="/assets/edit/:id" element={<EditAsset />} />
          <Route path="/employees/create" element={<CreateEmployee />} />
          <Route path="/employees/edit/:id" element={<EditEmployee />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
