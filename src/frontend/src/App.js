import { Routes, Route } from 'react-router-dom';

import './App.css'
import MyTest from './pages/MyTest'
import Home from './pages/Home/Home'
import Add from './pages/Add/Add'
import Test from './pages/Test/Test'
import Result from './pages/Result/Result'
import Hero from './components/Hero/Hero'
import Navbar from './components/Navbar/Navbar'

function App() {

  return (
    <div className="">
     <Hero />
     <Navbar />
     <Routes>
       <Route path='/' element={ <Home/> } />
       <Route path='/add-disease' element={ <Add/> } />
       <Route path='/test-dna' element={ <Test/> } />
       <Route path='/test-result' element={ <Result/> } />
     </Routes>
    </div>
  );
}

export default App;
