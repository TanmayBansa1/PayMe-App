import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import axios from 'axios';
const Signup = React.lazy(()=> import('./pages/Signup'))
const Signin = React.lazy(()=> import('./pages/Signin'))
const Dashboard = React.lazy(()=> import('./pages/Dashboard'))
const Send = React.lazy(()=> import('./pages/Send'))
function App() {

  return <div className='bg-slate-600'>

    {/* <div className='bg-blue-500'>hsdlufihsdfhkujlsdahfuihsjkldfhuikasdhfui</div> */}
    

      <BrowserRouter>
          <Suspense fallback={<div>Loading ....</div>}>
            <Routes>

            <Route path='/signup' element={<Signup></Signup>}></Route>
            <Route path='/signin' element={<Signin></Signin>}></Route>
            <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
            <Route path='/send' element={<Send></Send>}></Route>
        </Routes>
          </Suspense>

      </BrowserRouter>
    </div>
  
}

export default App
