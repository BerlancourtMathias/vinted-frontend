import "./publish.css";
import { useState } from "react";
import axios from "axios";

const Publish = () => {
  const [photo, setPhoto] = useState({});
  const [title, seTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [state, setState] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("");
  const [agreeToExchange, setAgreeToExchange] = useState(false);

  const handleSubmit = () => {};
  return (
    <div className="publishContainer">
      <form className="publishForm" onSubmit={handleSubmit}>
        <label>
          Photo
          <input name="photo" type="file" />
        </label>

        <label>
          Titre
          <input name="title" type="text" />
        </label>
        <label>
          Décris ton article
          <input name="description" type="textarea" />
        </label>
        <label>
          Marque
          <input name="brand" type="text" />
        </label>
        <label>
          Taille
          <input name="size" type="text" />
        </label>
        <label>
          Couleur
          <input name="color" type="text" />
        </label>
        <label>
          Etat
          <input name="state" type="text" />
        </label>
        <label>
          Lieu
          <input name="place" type="text" />
        </label>
        <label>
          Prix
          <input name="price" type="text" />
        </label>
        <label>
          Jes suis intéressé(e) par les échanges
          <input name="agreeToexchange" type="checkbox" />
        </label>
        <input type="submit" value="Publier" />
      </form>
      salut je suis la page publish
    </div>
  );
};
export default Publish;
