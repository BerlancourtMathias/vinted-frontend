import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.id; //j'aurais pu faire un destructuring

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]); //on met id ici car l'id de l'offre ne changera pas de valeur dans l'url (sur la même page)
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="offerContainer">
      <img src={data.product_image.secure_url} alt="product" />
      <p>{data.product_price}</p>
      {data.product_details.map((detail, index) => {
        const key = Object.keys(detail)[0];
        return (
          <div key={index}>
            <span>{key}:</span>
            <span>{detail[key]}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Offer;
