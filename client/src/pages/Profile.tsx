import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
type Props = {};

function Profile({}: Props) {
  const { user } = useAuth0();
  return (
    <div>
      <img src={user.picture} alt="Profile" width="50" />
      <h6>{user.name}</h6>
    </div>
  );
}

export default Profile;
