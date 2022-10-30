import { Auth0Provider } from "@auth0/auth0-react";
import React, { PropsWithChildren } from "react";
interface Auth0ProviderWithConfigProps {
  children: React.ReactNode;
}

// .env variables
// VITE_AUTH0_DOMAIN=
// VITE_AUTH0_CLIENT_ID=
// VITE_AUTH0_CALLBACK_URL=http://localhost:3000
// VITE_API_SERVER_URL=http://localhost:6060
// VITE_AUTH0_AUDIENCE=https://hello-world.example.com

export const Auth0ProviderWithConfig = ({
  children,
}: PropsWithChildren<Auth0ProviderWithConfigProps>): JSX.Element | null => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!(domain && clientId && redirectUri && audience)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};
