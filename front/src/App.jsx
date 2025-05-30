import './App.css'
import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./store/userSlice.jsx";
import {Provider} from 'react-redux'
import Header from './components/Header';
import {BrowserRouter} from "react-router-dom";
import React from "react";
import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import {AlertProvider} from "./context/alerts/AlertProvider.jsx";

const HomePage = React.lazy(() => import('./components/HomePage.jsx'));
const Login = React.lazy(() => import('./components/Login/LoginPage.jsx'));
const Register = React.lazy(() => import('./components/RegisterPage/RegisterPage.jsx'));
const AllDocuments = React.lazy(() => import('./components/AllDocument/AllDocuments.jsx'));
const Document = React.lazy(() => import('./components/Document/Document.jsx'));
const Error404 =React.lazy(()=>import('./components/Error404.jsx'));

const myStore = configureStore({
    reducer:{
        userSlice
    }
})

function App() {
  return (
      <BrowserRouter>
          <AlertProvider>
              <Provider store={myStore}>
                  <Header />
                 <Routes>
                    <Route path='*'  element={<Suspense fallback={'Loading...'}><Error404/></Suspense>}/>
                     <Route path='/' element={<Suspense fallback={'Loading...'}><HomePage /></Suspense>} />
                     <Route path='/Register' element={<Suspense fallback={'Loading...'}><Register /></Suspense>} />
                     <Route path='/AllDocuments' element={<Suspense fallback={'Loading...'}><AllDocuments /></Suspense>} />
                     <Route path='/Login' element={<Suspense fallback={'Loading...'}><Login /></Suspense>} />
                     <Route path='/Document/:id' element={<Suspense fallback={'Loading...'}><Document /></Suspense>} />

                 </Routes>
             </Provider>
          </AlertProvider>
      </BrowserRouter>

  )
}

export default App
