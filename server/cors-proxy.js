const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

const PORT = 5000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

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

app.post("/proxy-api", async (req, res) => {
  const {clientId, clientSecret, script, stdin, language, versionIndex} = req.body;
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
    output: data?.output
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
