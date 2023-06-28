import React, { useState, useEffect, useContext } from "react";
import Logout from "../Logout";
import { FirebaseContext } from "../Firebase";
import Quiz from "../Quiz";
import { Navigate } from "react-router-dom";

function Welcome() {
  const [session, setSession] = useState(null);
  const firebase = useContext(FirebaseContext);
  const [logged, setLogged] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let listener = firebase.auth.onAuthStateChanged(async (user) => {
      setLogged(user !== null);
      user && setSession(user);
    });
    if (session !== null) {
      firebase.getUser(session.uid).then((doc) => {
        if (doc && doc.exists) {
          setUserData(doc.data());
        }
      });
    }
    return () => {
      listener();
    };
  }, [firebase, session]);

  return session === null && logged === null ? (
    <>
      <div className="loader"></div>
      {/* <p>Loading...</p> */}
    </>
  ) : logged ? (
    <div className="quiz-bg">
      <div className="container">
        <Logout />
        <Quiz userData={userData} />
      </div>
    </div>
  ) : (
    <Navigate replace to="/" />
  );
}

export default Welcome;
