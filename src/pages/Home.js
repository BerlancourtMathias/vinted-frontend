import banner from "./assets/img/banner.jpeg";
import "./assets/css/home.css";

import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="homeContainer">
      <section className="banner">
        <img src={banner} alt="bannerHome" />
      </section>
    </div>
  );
};
export default Home;
