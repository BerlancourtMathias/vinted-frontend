import logo from "./assets/img/logo.svg";
import searchLogo from "./assets/img/loupe.png";
import "./header.css";

const Header = () => {
  return (
    <div className="headerContainer">
      <div className="alignHeader">
        <nav>
          <img src={logo} alt="logo du header" />
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
            <button className="signInLogIn">S'inscire | Se connecter</button>
            <button className="sellArticles">Vends tes articles</button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
