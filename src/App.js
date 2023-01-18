import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Signin from "./Components/Signin/Signin";
import Home from "./Components/Dashboard/Components/Home/Home";
import Landing from "./Components/Landing/Landing";
import Setup from "./Components/Setup/Setup";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Dashboard from "./Components/Dashboard/Dashboard";
import ChangeLogs from "./Components/ChangeLogs/ChangeLogs";
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          {/* <Route path='/home' element={<Home/>} /> */}
          <Route path="/setup" element={<Setup />} />
          <Route path="/changelogs" element={<ChangeLogs />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
