import axios from "axios";
import {v4 as uuid} from "uuid";

const createRoom = (navigate) => {
  const id = uuid();
  const url = `${import.meta.env.VITE_SERVER_URL}room/create`;

  const postData = {
    id,
  };

  axios
    .post(url, postData)
    .then((res) => {
      const {message} = res.data;
      if(message === "New Room created successfully"){
        navigate(`/room/${id}`);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export default createRoom;
