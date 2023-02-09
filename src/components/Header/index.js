import logo from "./assets/img/logo.svg";
import searchLogo from "./assets/img/loupe.png";
import { useNavigate } from "react-router-dom";
import "./header.css";

const Header = ({ setVisible, visible }) => {
  const navigate = useNavigate();
  return (
    <div className="headerContainer">
      <div className="alignHeader">
        <nav>
          <img src={logo} alt="logo du header" onClick={() => navigate("/")} />
          <div className="searchBar">
            <img src={searchLogo} alt="loupe" />
            <input
              id="searchText"
              name="searchText"
              type="textarea"
              placeholder="Recherche des articles"
            ></input>
          </div>
          <div className="buttonsContainer">
            <div className="signUpLogIn">
              <button id="signUp" onClick={() => navigate("/signup")}>
                S'inscire
              </button>
              <button id="logIn" onClick={() => navigate("/login")}>
                Se connecter
              </button>
              {/* <button
                onClick={() => {
                  setVisible(!visible); // on inverse la valeur de `visible` à chaque click
                }}
              >
                {visible && <Modal setVisible={setVisible} />}Afficher/Masquer
                Modal
              </button> */}
            </div>
            <button className="sellArticles">Vends tes articles</button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
