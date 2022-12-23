import './App.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import Signin from './Components/Signin/Signin';
import Home from './Components/Home/Home';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/signup' element={<Signin/>} />
        <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>} />
      </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
