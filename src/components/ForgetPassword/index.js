import React, { useState, useContext } from "react";
import { FirebaseContext } from "../Firebase";
import { Link, Navigate } from "react-router-dom";

const ForgetPassword = () => {
  const firebase = useContext(FirebaseContext);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isDone, setDone] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChangeData = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.resetPassword(email)
        setEmail("");
      setError('');
      setSuccess("Un email vous a ete envoye");
      
    } catch (error) {
      setError(error);
      setEmail("");
      
    } finally{
        setTimeout(() => {
            setDone(true)
          }, 3000);
    }
  };

  const errorMsg = error !== "" && <span>{error.message }</span>;

  const btn =
    email === "" && email === '' ? (
      <button disabled>Recuperer</button>
    ) : (
      <button>Recuperer</button>
    );
  return isDone?<Navigate replace to='/login' />: (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget"></div>
        <div className="formBoxRight">
          <div className="formContent">
            <form onSubmit={handleSubmit}>
              {errorMsg}
              {success!=='' && (
                <span
                  style={{
                    border: "1px solid green",
                    background: "green",
                    color: "#ffffff",
                  }}
                >
                  {success}
                </span>
              )}
              <h2>Mot de passe oublié</h2>

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

              {btn}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/signup">
                Pas de compte? Inscrivez-vous.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
