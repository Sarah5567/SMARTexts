// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Main from './components/AllDocuments.jsx'
import LogIN from './components/LogIn/LogInPage.jsx'
import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./store/userSlice.jsx";
import {Provider} from 'react-redux'
import Header from './components/Header';
import {BrowserRouter} from "react-router-dom";
import React from "react";
import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';


const HomePage = React.lazy(() => import('./components/HomePage.jsx'));
const Login = React.lazy(() => import('./components/Login/LoginPage.jsx'));
const Register = React.lazy(() => import('./components/RegisterPage/RegisterPage.jsx'));
const AllDocuments = React.lazy(() => import('./components/AllDocuments.jsx'));

const myStore = configureStore({
    reducer:{
        userSlice
    }
})

function App() {
  return (
      <BrowserRouter>
         <Provider store={myStore}>
              <Header />
             <Routes>
                 <Route path='/' element={<Suspense fallback={'Loading...'}><HomePage /></Suspense>} />
                 <Route path='/Register' element={<Suspense fallback={'Loading...'}><Register /></Suspense>} />
                 <Route path='/AllDocuments' element={<Suspense fallback={'Loading...'}><AllDocuments /></Suspense>} />
                 <Route path='/Login' element={<Suspense fallback={'Loading...'}><Login /></Suspense>} />
             </Routes>
         </Provider>
    </BrowserRouter>

  )
}

export default App
