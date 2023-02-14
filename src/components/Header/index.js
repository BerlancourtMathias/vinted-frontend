import logo from "./assets/img/logo.svg";
import searchLogo from "./assets/img/loupe.png";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Range } from "react-range";
import Login from "../Login/index";

const Header = ({ setData, showModal, setShowModal, handleToken, token }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [values, setValues] = useState([30, 50]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  };
  const query = `title=${search}&priceMin=${values[0]}&priceMax=${values[1]}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        //je fais une requête axios
        // setIsLoading(true);
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?${query}`
        );
        console.log(
          "la query :",
          `https://lereacteur-vinted-api.herokuapp.com/offers?${query}`
        );
        setData(response.data);
        // setIsLoading(false);
        // console.log("response.data : ", response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search, values, query, setData]); //j'ai ajouté query et setData au tab de dépendnace suite à un warning de react

  console.log("values", values);
  return (
    <>
      <div className="headerContainer">
        <div className="alignHeader">
          <nav>
            <img
              src={logo}
              alt="logo du header"
              onClick={() => navigate("/")}
            />
            <div className="searchBar">
              <img src={searchLogo} alt="loupe" />
              <form>
                <input
                  id="searchText"
                  name="searchText"
                  type="textarea"
                  placeholder="Recherche des articles"
                  onChange={handleSearch}
                  value={search}
                />
              </form>
              <div className="sliderCointainer" style={{ width: "100%" }}>
                <Range
                  min={0}
                  max={1000}
                  values={values}
                  onChange={(values) => setValues(values)}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "6px",
                        width: "100%",
                        backgroundColor: "#017580 ",
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ index, props, isDragged }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "20px",
                        width: "40px",
                        borderRadius: "4px",
                        backgroundColor: "#FFF",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "0px 2px 6px #AAA",
                      }}
                    >
                      <div
                        className="cursorOne"
                        style={{
                          position: "absolute",
                          top: "-28px",
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: "14px",
                          fontFamily:
                            "Arial,Helvetica Neue,Helvetica,sans-serif",
                          padding: "4px",
                          borderRadius: "4px",
                          backgroundColor: "#548BF4",
                          display: "none",
                        }}
                      >
                        {/* <div>{values[index]}</div>

                      {values[index]} */}
                        {/* ici c'est l'arguement de mon slider une valeur de mon tableau values , si je veux ensuite
                      afficher comme une etiquette sur mon slider, je fais ma div d'affichage en dessous, si je veuc que la valeur 
                       soit sur les curseurs je mets ma div d'affichage après la div cursor two*/}
                        {values[index]}
                        <div>{values[index]}</div>
                      </div>
                      <div
                        className="cursorTwo"
                        style={{
                          display: "none",
                          height: "16px",
                          width: "5px",
                          backgroundColor: isDragged ? "#548BF4" : "#CCC",
                        }}
                      />
                      {/* ici je mets ce qui s'affiche sur les cursors */}
                      <div>{values[index]}</div>
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="buttonsContainer">
              {token ? (
                <button
                  className="signOutButton"
                  onClick={() => {
                    handleToken(null);
                    navigate("/");
                  }}
                >
                  Se déconnecter
                </button>
              ) : (
                <div className="signUpLogIn">
                  <button id="signUp" onClick={() => navigate("/signup")}>
                    S'inscire
                  </button>

                  <button
                    id="logIn"
                    onClick={() => {
                      setShowModal(!showModal);
                    }}
                  >
                    Se connecter
                  </button>
                </div>
              )}
              <button
                className="sellArticles"
                onClick={() => {
                  token ? navigate("/publish") : setShowModal(!showModal);
                }}
              >
                Vends tes articles
              </button>
            </div>
          </nav>
        </div>
      </div>
      {showModal && (
        <Login
          showModal={showModal}
          setShowModal={setShowModal}
          handleToken={handleToken}
        />
      )}
    </>
  );
};

export default Header;
