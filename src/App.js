import { Route,Routes } from 'react-router-dom';
import './App.css';

import Signup from './Pages/Signup';

import Login from './Pages/Login';
import VerifyEmail from './Pages/VerifyEmail';
import Home from './Pages/Home';
import ProtectedRoute from './Components/Commen/ProtectedRoute';
import OpenRout from './Components/Commen/OpenRout';

function App() {

  return (
   <div className='bg-white'>
       <Routes>
          <Route path='/chat' element={<ProtectedRoute> <Home/> </ProtectedRoute>}/>
          <Route path='/sign-up' element={<OpenRout> <Signup/></OpenRout>}/>
          <Route path='/verify-email' element={<OpenRout> <VerifyEmail/></OpenRout>}/>
          <Route path='/' element={<OpenRout> <Login/></OpenRout>}/>
       </Routes>
   </div>
  );
}

export default App;
