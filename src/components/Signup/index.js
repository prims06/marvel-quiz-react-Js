import React, { useState, useContext } from "react";
import { FirebaseContext } from "../Firebase";
import { Link, Navigate } from "react-router-dom";

function SignUp(props) {
  const firebase = useContext(FirebaseContext);
  const data = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  console.log(props);
  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState("");
  const [isLogged, setLogStatus] = useState(false);

  const handleChangeData = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let authUser = await firebase.signUp(loginData.email, loginData.password);

      firebase.user(authUser.user.uid, pseudo, email);
      setLoginData({ ...data });
      setLogStatus(true);
    } catch (error) {
      setError(error);
      setLoginData({ ...data });
    }
  };

  const errorMsg = error !== "" && <span>{error.message}</span>;

  const { pseudo, email, password, confirmPassword } = loginData;
  const btn =
    pseudo === "" ||
    email === "" ||
    password === "" ||
    confirmPassword !== password ? (
      <button disabled>Inscription</button>
    ) : (
      <button>Inscription</button>
    );

  return isLogged ? (
    <Navigate replace to="/welcome" />
  ) : (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup"></div>
        <div className="formBoxRight">
          <div className="formContent">
            <form onSubmit={handleSubmit}>
              {errorMsg}
              <h2>Inscription</h2>
              <div className="inputBox">
                <input
                  onChange={handleChangeData}
                  value={pseudo}
                  type="text"
                  id="pseudo"
                  required
                  autoComplete="off"
                />
                <label htmlFor="pseudo">Pseudo</label>
              </div>

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

              <div className="inputBox">
                <input
                  onChange={handleChangeData}
                  value={confirmPassword}
                  type="password"
                  id="confirmPassword"
                  required
                  autoComplete="off"
                />
                <label htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </label>
              </div>
              {btn}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Deja inscrit? Connectez-vous.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
