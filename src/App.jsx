import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import { AuthContextProvider } from "./Context/AuthContext";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Account from "./Pages/Account";
import ProtectedRoute from "./Components/ProtectedRoute";
import MovieOverview from "./Pages/MovieOverview";
function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route
            path="/Account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="/MovieOverview" element={<MovieOverview />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
