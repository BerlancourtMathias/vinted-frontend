import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import "./offer.css";
import { useNavigate } from "react-router-dom";

const Offer = ({ token, setShowModal }) => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [messageError, setMessageError] = useState();

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
        setMessageError("L'offre n'a pas pu être chargée.");
      }
    };
    fetchData();
  }, [id]); //on met id ici car l'id de l'offre ne changera pas de valeur dans l'url (sur la même page)

  if (isLoading) return <Spinner />;
  else if (messageError) return <div>{messageError}</div>;
  else
    return (
      <div className="offerContainer">
        <h2>{data.product_name}</h2>
        <img src={data.product_image.secure_url} alt="product" />
        <p style={{ color: "#07eb1e" }}>
          <strong>{data.product_price + " €"}</strong>
        </p>
        {data.product_details.map((detail, index) => {
          const key = Object.keys(detail)[0];
          return (
            <div key={index}>
              <span>{key}:</span>
              <span style={{ color: "#017580" }}>{detail[key]}</span>
            </div>
          );
        })}
        <button
          onClick={() => {
            token
              ? navigate("/payment", {
                  state: {
                    title: data.product_name,
                    price: data.product_price,
                    username: data.owner.account.username,
                    image: data.product_image.secure_url,
                    id: data._id,
                  },
                })
              : setShowModal(true);
          }}
        >
          Acheter
        </button>
      </div>
    );
};

export default Offer;
