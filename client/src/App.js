import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import Basket from "./pages/Basket";
import Error404 from "./pages/ErrorPage";
import ProtectedAdmin from "./pages/Admin/ProtectedAdmin";
import AdminOrder from "./pages/Admin/Orders";
import AdminProduct from "./pages/Admin/Product";
import AdminHome from "./pages/Admin/Home";
import AdminProductDetail from "./pages/Admin/ProductDetail";
import NewProduct from "./pages/Admin/Product/new";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div id="content">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/product/:product_id" element={<ProductDetail />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/basket" element={<Basket />} />
            <Route element={<ProtectedAdmin />}>
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/admin/orders" element={<AdminOrder />} />
              <Route path="/admin/product" element={<AdminProduct />} />
              <Route
                path="/admin/product/:product_id"
                element={<AdminProductDetail />}
              />
              <Route path="/admin/products/new" element={<NewProduct />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
