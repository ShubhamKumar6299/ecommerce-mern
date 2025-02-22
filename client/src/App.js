import './App.css';
import Cart from './source/Cart';
import Checkout from './source/Checkout';
import Product from './source/Product';
import SignIn from './source/SignIn';
import SignUp from './source/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/products' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
      </Routes>
    </Router>
  );
}

export default App;
