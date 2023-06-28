import React, { useState, useContext } from "react";
import { FirebaseContext } from "../Firebase";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const firebase = useContext(FirebaseContext);
  const data = {
    email: "",
    password: "",
  };

  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState("");
  const [isLogged, setLogStatus] = useState(false);

  const handleChangeData = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.signIn(loginData.email, loginData.password);
      setLoginData({ ...data });
      setLogStatus(true);
    } catch (error) {
      setError(error);
      setLoginData({ ...data });
    }
  };

  const errorMsg = error !== "" && <span>{error.message}</span>;

  const { email, password } = loginData;
  const btn =
    email === "" ||
    password === ""? (
      <button disabled>Connexion</button>
    ) : (
      <button>Connexion</button>
    );

  return isLogged ? (
    <Navigate replace to="/welcome" />
  ) : (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin"></div>
        <div className="formBoxRight">
          <div className="formContent">
            <form onSubmit={handleSubmit}>
              {errorMsg}
              <h2>Connexion</h2>
              
              <div className="inputBox">
                <input
                  onChange={handleChangeData}
                  value={email}
                  type="email"
                  id="email"
                  required
                  autoComplete="off"
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="inputBox">
                <input
                  onChange={handleChangeData}
                  value={password}
                  type="password"
                  id="password"
                  required
                  autoComplete="off"
                />
                <label htmlFor="password">Mot de passe</label>
              </div>

              {btn}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/signup">
                Pas de compte? Inscrivez-vous.
              </Link><br />
              <Link className="simpleLink" to="/forget">
                Mot de passe oublié? Recuperé le.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
