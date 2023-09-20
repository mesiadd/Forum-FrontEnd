import axios from "axios";
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { UserContext } from "./context/UserContext";
import Header1 from "./Header/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Footer from "./Footer/Footer";
import SignUp from "./pages/Signup/Signup";


import AskQuestion from "./pages/AskQuestion/AskQuestion";
import QuestionDetail from "./pages/QuestionDetail/QuestionDetail";
import NotFound from "./NotFound";
import ForgotPassword from "./ForgotPassword/ResetByNewPassword";
import ResetSent from "./ForgotPassword/ResetSent";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ResetByNewPassword from "./ForgotPassword/ResetByNewPassword";

function App() {
  const [userData, setUserData] = useContext(UserContext);

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      try {
        const userRes = await axios.get(`${process.env.REACT_APP_base_url}/api/users`, {
          headers: { "x-auth-token": token },
        });
        // console.log(userRes);
        setUserData({
          token,
          user: {
            id: userRes.data.data.user_id,
            display_name: userRes.data.data.user_name,
          },
        });
      } catch (error) {
        console.log(error)
        
      }
      
    }
  };
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);
  return (
    <Router>
      <Header1 logout={logout} />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home logout={logout} />} />
        <Route path="/ask-question" element={<AskQuestion />} />
        <Route path="/questions/:id" element={<QuestionDetail />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/reset-sent" element={<ResetSent />} />
        <Route path="/reset" element={<ResetByNewPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;

