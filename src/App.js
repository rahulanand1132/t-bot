import React, { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Telegram } from './Pages/Home/Telegram';
// import { Form } from './Pages/Form';
import { useEffect } from 'react';
import CheckUserRating from './Pages/CheckUserRating';
const tele = window.Telegram.WebApp
const basename = process.env.NODE_ENV === 'production' ? '/t-bot' : '';

function App() {
  console.log('test telegram user =>>>>', tele)
  console.log('test telegram user data =>>>>', tele.initDataunsafe?.user)

  useEffect(() => {
    tele.ready()
    console.log("Hi")
  }, [])
  return (<BrowserRouter basename={basename}>
    <Routes>
      <Route path='/' Component={Telegram} />
      <Route path='/CheckUserRating' Component={CheckUserRating} />
    </Routes>
  </BrowserRouter>);
}

export default App;
