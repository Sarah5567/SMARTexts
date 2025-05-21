// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Main from './components/RegisterPage/RegisterPage.jsx'
import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./store/userSlice.jsx";
import {Provider} from 'react-redux'
import Header from './components/Header';


const myStore = configureStore({
    reducer:{
        userSlice
    }
})

function App() {
  return (
    <Provider store={myStore}>
        <Header />
    </Provider>
  )
}

export default App
