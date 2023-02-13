import axios from "axios";

const submitCode = (code, input, language) => {
  const client_ID = import.meta.env.VITE_CLIENT_ID;
  const client_secret = import.meta.env.VITE_CLIENT_SECRET;
  const url = `${import.meta.env.VITE_SERVER_URL}proxy-api`;

  const postData = {
    clientId: client_ID,
    clientSecret: client_secret,
    script: code,
    stdin: input,
    language,
    versionIndex: 0,
  };

   return axios.post(url, postData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default submitCode;
