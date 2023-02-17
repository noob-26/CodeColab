import axios from "axios";

const saveCode = (code, id) => {
  const url = `${import.meta.env.VITE_SERVER_URL}room/savecode`;
  const postData = {
    code,
    id,
  };

  axios
    .post(url, postData)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export default saveCode;
