import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
//Components
import Header from "./components/Header";
import Footer from "./components/Footer";

//Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer/Offer";
import Signup from "./pages/Signup";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState(Cookies.get("token-vinted") || null);
  // const onPage = { home: false, offer: false, publish: false, signup: false };
  // je fais une variable Onpage
  //que je fais passer à true si l'utilisateur est
  //sur la page correspondant à la clé de mon objet

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token-vinted", token, { expires: 30 });
    } else setToken(null);
    Cookies.remove("token-vinted");
  };

  return (
    <div className="App">
      <Router>
        <Header
          data={data}
          setData={setData}
          setIsLoading={setIsLoading}
          showModal={showModal}
          setShowModal={setShowModal}
          token={token}
          handleToken={handleToken}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                data={data}
                setData={setData}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                token={token}
                handleToken={handleToken}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup
                handleToken={handleToken}
                token={token}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            }
          />
          {
            <Route
              path="/loginpage"
              element={<LoginPage handleToken={handleToken} token={token} />}
            />
          }
          <Route
            path="/offer/:id"
            element={
              <Offer
                token={token}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            }
          />
          <Route
            path="/publish"
            element={
              <Publish
                token={token}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            }
          />
          <Route path="/payment" element={<Payment />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
