import "./offercard.css";
import { Link } from "react-router-dom";

const OfferCard = ({ offerInfos }) => {
  return (
    <Link to={`offer/${offerInfos._id}`}>
      <div className="offerCard" key={offerInfos._id}>
        <section className="owner">
          {offerInfos.owner.account.avatar && (
            <img
              id="ownerProfilePic"
              src={offerInfos.owner.account.avatar.secure_url}
              alt="owner"
            />
          )}
          <div id="ownerUserName">{offerInfos.owner.account.username}</div>
        </section>
        <div id="titleOffer">{offerInfos.product_name}</div>
        <img
          id="productPicture"
          src={offerInfos.product_image.secure_url}
          alt="offer vizualisation"
        />
        <div className="productPrice">{offerInfos.product_price} €</div>
        <div className="productSize">
          {offerInfos.product_details.map((detail, index) => {
            if (detail.TAILLE) {
              return <p key={index}>{detail.TAILLE}</p>;
            } else if (detail.MARQUE) {
              return <p key={index}>{detail.MARQUE}</p>;
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </Link>
  );
};
export default OfferCard;
