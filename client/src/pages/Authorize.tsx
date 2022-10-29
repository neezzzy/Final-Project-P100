import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios"

const Authorize = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [data, setUserMetadata] = useState(null);

// useEffect: when you make an API call
// udpated when getAccessTokenSilently() is updated on ln 43
  useEffect(() => {
    const getUserMetadata = async () => {
      // const domain = "dev-tdz1zjoqa3dxpzkp.us.auth0.com";
      try {
        // const accessToken = await getAccessTokenSilently({
          // audience: `https://${domain}/api/v2/`,
          // audience: "http://localhost:8080",
          // scope: "read:current_user",
        // });
  
        // const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
  
        const metadataResponse = await axios.get("http://localhost:8080/authorize");
  
        const data = metadataResponse.data;
        console.log(metadataResponse);
        console.log(data);
        setUserMetadata(data);

      } catch (e) {
        console.log(e.message);
        console.log(error.response.data)
      }
    };
  
    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  
  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h3>User Metadata</h3>
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )}
      </div>
    )
  );
};

export default Authorize;