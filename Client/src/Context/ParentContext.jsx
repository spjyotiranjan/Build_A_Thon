import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { setCookie } from "./../Components/ManageCookies";

export const AppContext = createContext();

const ParentContext = ({ children }) => {
  const [isSocialLogin, setIsSocialLogin] = useState(null);
  const [userData, setUserData] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [loginDone, setLoginDone] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [loggedInUser, setLoggedInUser] = useState({});
  console.log(userId);

  useEffect(() => {
    const options = {
      method: "POST",
      url: `https://${import.meta.env.VITE_AUTH0_DOMAIN}/oauth/token`,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: import.meta.env.VITE_AUTH0_MANAGEMENT_CLIENT_ID,
        client_secret: import.meta.env.VITE_AUTH0_MANAGEMENT_CLIENT_SECRET,
        audience: `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/`,
      }),
    };
    axios
      .request(options)
      .then(function (response) {
        setAccessToken(response.data.access_token);
        // console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });

    axios
      .get("http://localhost:3000/api/userdatas")
      .then((res) => {
        setAllUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (userId != "" && loginDone) {
      axios
        .get(`http://localhost:3000/api/userdatas/${userId}`)
        .then((res) => {
          setLoggedInUser(res.data.User);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);

  useEffect(()=>{
    if(Object.keys(loggedInUser).length != 0){
      setCookie("username",loggedInUser.Username,1)
    }
  },[loggedInUser])

  return (
    <AppContext.Provider
      value={{
        isSocialLogin,
        setIsSocialLogin,
        userData,
        setUserData,
        accessToken,
        setAccessToken,
        loginDone,
        setLoginDone,
        allUsers,
        setAllUsers,
        userId,
        setUserId,
        loggedInUser,
        setLoggedInUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ParentContext;
