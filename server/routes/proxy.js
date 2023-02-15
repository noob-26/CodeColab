const express = require("express");
const axios = require("axios");

const router = express.Router();

const url = `https://api.jdoodle.com/v1/execute`;

const submitCode = async (
  clientId,
  clientSecret,
  script,
  stdin,
  language,
  versionIndex
) => {
  const dataSent = {
    clientId,
    clientSecret,
    script,
    stdin,
    language,
    versionIndex,
  };

  const {data} = await axios.post(url, dataSent, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
};

router.post("/proxy-api", async (req, res) => {
  const {clientId, clientSecret, script, stdin, language, versionIndex} =
    req.body;
  const data = await submitCode(
    clientId,
    clientSecret,
    script,
    stdin,
    language,
    versionIndex
  );

  //console.log(clientId, clientSecret, script, stdin, language, versionIndex);

  res.json({
    output: data?.output,
  });
});

module.exports = {
  ProxyRouter: router,
};
