const submitCode = (code, input, setOutput) => {
    const client_ID = import.meta.env.VITE_CLIENT_ID;
    const client_secret = import.meta.env.VITE_CLIENT_SECRET;

    console.log("yee", code, input, client_ID, client_secret);
}

export default submitCode;