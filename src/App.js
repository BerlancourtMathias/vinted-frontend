import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Components
import Header from "./components/Header";
import Footer from "./components/Footer";

//Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const App = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="App">
      <Router>
        <Header
          visible={visible}
          setVisible={setVisible}
          data={data}
          setData={setData}
          setIsLoading={setIsLoading}
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
              />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/offer/:id" element={<Offer />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
