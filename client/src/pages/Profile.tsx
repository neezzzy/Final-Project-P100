import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
type Props = {};

function Profile({}: Props) {
  const [message, setMessage] = useState("");
  const apiServerUrl = "http://localhost:3000";
  const callExternalApi = async (options) => {
    try {
      const response = await axios(options.config);
      const { data } = response;

      return {
        data,
        error: null,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error;

        const { response } = axiosError;

        let message = "http request failed";

        if (response && response.statusText) {
          message = response.statusText;
        }

        if (axiosError.message) {
          message = axiosError.message;
        }

        if (response && response.data && response.data.message) {
          message = response.data.message;
        }

        return {
          data: null,
          error: {
            message,
          },
        };
      }

      return {
        data: null,
        error: {
          message: error.message,
        },
      };
    }
  };
  useEffect(() => {
    let isMounted = true;
    const getProtectedResource = async () => {
      const config = {
        url: `${apiServerUrl}/profile`,
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      };

      const { data, error } = await callExternalApi({ config });

      return {
        data: data || null,
        error,
      };
    };

    const getMessage = async () => {
      const { data, error } = await getProtectedResource();

      if (!isMounted) {
        return;
      }

      if (data) {
        setMessage(JSON.stringify(data, null, 2));
      }

      if (error) {
        setMessage(JSON.stringify(error, null, 2));
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="content-layout">
      <h1>Protected Page</h1>
      <div>
        <h2>{message}</h2>
      </div>
    </div>
  );
}
export default Profile;
