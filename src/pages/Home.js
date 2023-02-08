import banner from "./assets/img/banner.jpeg";
import "./assets/css/home.css";

import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="homeContainer">
      <section className="banner">
        <img src={banner} alt="bannerHome" />
      </section>
      <div className="widgetContainer">
        <div className="widgetBlock">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <button id="sellnow" name="sellNow" className="sellNowButoon">
            Vends maintenant
          </button>
          <div>
            <span>Découvrir comment ça marche</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
