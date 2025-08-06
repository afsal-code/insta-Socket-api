  
import './App.css'
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'

import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';


function App() {
 
  return (
    <>
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>

       
    </>
  )
}

export default App
