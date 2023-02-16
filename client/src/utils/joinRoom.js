import axios from "axios";

const joinRoom = (navigate, roomId, setError) => {
  const url = `${import.meta.env.VITE_SERVER_URL}room/find/${roomId}`;
  axios
    .get(url)
    .then((res) => {
      const { message } = res.data;
      if(message === "Room not found"){
        setError(true);
        return;
      }

      navigate(`/room/${roomId}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export default joinRoom;
