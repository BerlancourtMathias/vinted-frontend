import { Link } from "react-router-dom";
const OfferCard = ({ offerInfos }) => {
  return (
    <Link to={`offer/${offerInfos._id}`}>
      <div className="offerCard" key={offerInfos._id}>
        <section className="owner">
          {offerInfos.owner.account.avatar && (
            <img
              style={{
                height: 50,
                width: 50,
                borderRadius: "50%",
                objectFit: "cover",
              }}
              id="ownerProfilePic"
              src={offerInfos.owner.account.avatar.secure_url}
              alt="owner"
            />
          )}
          <div id="ownerUserName">{offerInfos.owner.account.username}</div>
        </section>
        <div className="offerPicture">
          <img
            id="productPicture"
            src={offerInfos.product_image.secure_url}
            alt="offer vizualisation"
          />
        </div>
        <div className="productPrice">
          <p> €</p>
        </div>
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
        <div className="productBrand"></div>
      </div>
    </Link>
  );
};
export default OfferCard;
