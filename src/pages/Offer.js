import { useParams } from "react-router-dom";

const Offer = ({ offers }) => {
  const { id } = useParams();
  return <div className="offerContainer"></div>;
};

export default Offer;
