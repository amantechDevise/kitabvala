import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import 'remixicon/fonts/remixicon.css';

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Admin Pages

// Website Pages
import Login from "./pages/admin/auth/Login";
import Signup from "./pages/admin/auth/Signup";
import Home from "./pages/website/Home";
import AdminLayouts from "./pages/admin/AdminLayout";
import CategoryList from "./pages/admin/pages/Categories/CateListing";
import Dashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/admin/pages/Product/ListProduct";
import AdminPrivateRoute from "./pages/admin/context/AdminPrivateRoute";
import AddProduct from "./pages/admin/pages/Product/AddProduct";
import EditProduct from "./pages/admin/pages/Product/EditProduct";
import ContactUsList from "./pages/admin/pages/ContactUs/ListContact";
import UserListing from "./pages/admin/pages/Users/UserListing";
import ViewPage from "./pages/admin/pages/Users/ViewPage";
import ViewProduct from "./pages/admin/pages/Product/Viewproduct";
import OrderListing from "./pages/admin/pages/Orders/orderListing";
import Productpage from "./pages/website/Productspage";
import AddCart from "./pages/website/components/AddCartPage";
import AddImage from "./pages/admin/pages/Product/AddImages";

function App() {
  return (
    <BrowserRouter>
      {/* Header & Footer only on Website Routes */}
      <Routes>
        {/* Website (User) Routes */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <main className="flex-grow m-auto">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/category/:id" element={<Productpage />} />
                  <Route path="/cart" element={<AddCart />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />

        {/* Admin Auth Routes (no header/footer) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminPrivateRoute>
              <AdminLayouts />
            </AdminPrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
           <Route path="customers" element={<UserListing />} />
           <Route path="customers/:id" element={<ViewPage />} />
           <Route path="orders" element={<OrderListing />} />
           <Route path="category" element={<CategoryList />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/view/:id" element={<ViewProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
            <Route path="contact_us" element={<ContactUsList />} />
            <Route path="add_image/:product_id" element={<AddImage />} />
        </Route>
      </Routes>
          <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
