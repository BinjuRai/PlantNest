import React from 'react';
import Header from '../layouts/header.jsx';
import Footer from '../layouts/footer.jsx';
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import PlantNest from '../pages/homepage';

export default function MainLayout() {
  return (
    <div >
    <Header/>
    <Outlet/>
     <ToastContainer />
    <Footer/>
    </div>
  )
}
