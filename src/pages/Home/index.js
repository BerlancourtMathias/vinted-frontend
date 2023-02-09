import banner from "./assets/img/banner.jpeg";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import OfferCard from "../../components/OfferCard/OfferCard";
import "./home.css";

const Home = ({ offers }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        //je fais une requête axios
        const response = await axios.get(
          " https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        console.log("response.data : ", response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <Spinner />
  ) : (
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
      {data.offers.map((offer) => {
        // console.log("offers:", offers);
        // console.log("offer : ", offer);
        return <OfferCard offerInfos={offer} key={offer._id} />;
      })}
    </div>
  );
};
export default Home;
