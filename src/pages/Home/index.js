import banner from "./assets/img/banner.jpeg";
import tears from "./assets/img/tear-d431548c90905ad757632e4c3075d9473e38c7c6642721efeae9413afb9387a2.svg";
import { useEffect } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import OfferCard from "../../components/OfferCard/";
import { useNavigate } from "react-router-dom";
import "./home.css";
// import { Range } from "react-range";

const Home = ({ data, setData, isLoading, setIsLoading }) => {
  // const [values, setValues] = useState([30, 50]);
  const navigate = useNavigate();
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
  }, [setData, setIsLoading]);

  return (
    <div className="homeContainer">
      <section className="banner">
        <img id="banner" src={banner} alt="bannerHome" />

        {/* <section className="tearsBanner"> */}
        <img id="tears" src={tears} alt="tears effect on banner" />
        {/* </section> */}
        <div className="widgetContainer">
          <div className="widgetBlock">
            <h1>Prêts à faire du tri dans vos placards ?</h1>
            <button
              id="sellnow"
              name="sellNow"
              className="sellNowButon"
              //Faire naviguer vers publish}
            >
              Vends maintenant
            </button>
            <div>
              <span>Découvrir comment ça marche</span>
            </div>
          </div>
        </div>
      </section>
      <div className="containerOffer">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="offerCardContainer">
            {data.offers.map((offer) => {
              // console.log("offers:", offers);
              // console.log("offer : ", offer);
              return <OfferCard offerInfos={offer} key={offer._id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
