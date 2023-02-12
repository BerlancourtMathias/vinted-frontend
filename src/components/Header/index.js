import logo from "./assets/img/logo.svg";
import searchLogo from "./assets/img/loupe.png";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Range } from "react-range";
import Login from "../../pages/Login";

const Header = ({ setData, setIsLoading, showModal, setShowModal }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [values, setValues] = useState([30, 50]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  const queryConstruct = useMemo(() => {
    let queryString = "https://lereacteur-vinted-api.herokuapp.com/offers?";
    if (search) {
      queryString += `title=${search}`;
    }
    if (values) {
      queryString += `&priceMin=${values[0]}&priceMax=${values[1]}`;
    }
    return queryString;
  }, [values, search]);

  useEffect(() => {
    setData(search);
    const fetchData = async () => {
      try {
        //je fais une requête axios
        setIsLoading(true);
        const response = await axios.get(queryConstruct);
        console.log(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}`
        );
        setData(response.data);
        setIsLoading(false);
        // console.log("response.data : ", response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search, values, queryConstruct, setData, setIsLoading]);

  console.log("values", values);
  return (
    <div className="headerContainer">
      <div className="alignHeader">
        <nav>
          <img src={logo} alt="logo du header" onClick={() => navigate("/")} />
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
            <div style={{ width: "100%" }}>
              <Range
                min={0}
                max={100}
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
                      height: "42px",
                      width: "42px",
                      borderRadius: "4px",
                      backgroundColor: "#FFF",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0px 2px 6px #AAA",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-28px",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "14px",
                        fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
                        padding: "4px",
                        borderRadius: "4px",
                        backgroundColor: "#548BF4",
                      }}
                    >
                      {values[index]}
                    </div>
                    <div
                      style={{
                        height: "16px",
                        width: "5px",
                        backgroundColor: isDragged ? "#548BF4" : "#CCC",
                      }}
                    />
                  </div>
                )}
              />
            </div>
          </div>
          <div className="buttonsContainer">
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
            <button className="sellArticles">Vends tes articles</button>
          </div>
        </nav>
      </div>
      {showModal && <Login showModal={showModal} setShowModal={setShowModal} />}
      ;
    </div>
  );
};

export default Header;
