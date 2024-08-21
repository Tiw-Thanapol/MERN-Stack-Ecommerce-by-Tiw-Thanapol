//app

import React, {useState,useEffect} from "react";

//Pageไม่ล็อกอิน
import Register from "./commponents/pages/auth/Register";
import Login from "./commponents/pages/auth/Login";
import Home from "./commponents/pages/Home";
import Product from './commponents/pages/Product'
import Shop from "./commponents/pages/Shop";
import Cart from "./commponents/pages/Cart";
//Layout
import Navbar from "./commponents/layouts/Navbar";

import { Routes, Route } from 'react-router-dom'

// page admin
import HomeAdmin from './commponents/pages/admin/Home'
import ManageAdmin from './commponents/pages/admin/ManageAdmin'
import CreateCategory from './commponents/pages/admin/category/CreateCategory'
import UpdateCategory from './commponents/pages/admin/category/UpdateCategory'

import CreateProduct from './commponents/pages/admin/product/CreateProducts'
import UpdateProduct from "./commponents/pages/admin/product/UpdateProduct";


// page user
import HomeUser from './commponents/pages/user/Home'
import CheckOut from "./commponents/pages/CheckOut";
import WishList from "./commponents/pages/user/WishList"
import History from "./commponents/pages/user/History";

// functions
import { currentUser } from "./commponents/functions/auth";

//redux
import { useDispatch } from 'react-redux'

// Routes
import UserRoute from "./commponents/routes/UserRoute";
import AdminRoute from "./commponents/routes/AdminRoute";

//Drawer
import SideDrawer from "./commponents/drawer/SideDrawer";

//Toastify
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Orders from "./commponents/pages/admin/Orders";

function 
  App() {
  const dispatch = useDispatch();
  const idtoken = localStorage.token;
  
  if(idtoken) {
    currentUser (idtoken)
    .then((res) => {
      // code
      console.log(res.data);
      dispatch({
        type:'LOGIN' ,
        payload: {
          token: idtoken,
          username: res.data.username,
          role: res.data.role,
        }
      });
    })
      .catch((err) => {
      //err
      console.log(err.data);
      
    })
  }

  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <SideDrawer />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>

      <Route path="/product/:id" element={<Product/>}/>
      <Route path="/shop" element={<Shop/>}/>
      <Route path="/cart" element={<Cart/>}/>



      <Route path="/admin/index" 
      element={
        <AdminRoute>
          <HomeAdmin />
        </AdminRoute>
      }
      />

      <Route 
      path="/admin/manage-admin" 
      element={
        <AdminRoute>
          <ManageAdmin />
        </AdminRoute>
      }
      />

      <Route 
      path="/admin/create-category" 
      element={
        <AdminRoute>
          <CreateCategory />
        </AdminRoute>
      }
      />

      <Route 
      path="/admin/update-product/:id" 
      element={
        <AdminRoute>
          <UpdateProduct />
        </AdminRoute>
      }
      />

      <Route 
      path="/admin/update-category/:id" 
      element={
        <AdminRoute>
          <UpdateCategory />
        </AdminRoute>
      }
      />
      <Route 
      path="/admin/create-product/" 
      element={
        <AdminRoute>
          <CreateProduct />
        </AdminRoute>
      }
      />

      <Route 
      path="/admin/orders" 
      element={
        <AdminRoute>
          <Orders />
        </AdminRoute>
      }
      />

      <Route path="/user/index" 
      element={
        <UserRoute>
          <HomeUser />          
        </UserRoute>
      }
      />

      <Route path="/checkout" 
      element={
        <UserRoute>
          <CheckOut />          
        </UserRoute>
      }
      />

      <Route path="/user/wishlist" 
      element={
        <UserRoute>
          <WishList />          
        </UserRoute>
      }
      />

      <Route path="/user/history" 
      element={
        <UserRoute>
          <History />          
        </UserRoute>
      }
      />

    </Routes>
 
    </div>
  );
}

export default App;
