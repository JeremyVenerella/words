import axios from "axios";

const signin = async (user) => {
    const res = await axios.post("/signin", user);
    return res;
}


const signup = async (user) => {
    const res = await axios.post("/signup", user);
    return res;
}

const hasSignedIn = async (user) => {
    const res = await axios.get("/hassignedin", user);
    return res;
}

const signout = async (user) => {
    const res = await axios.get("/signout", user);
    return res;
}

const getAllWords = async (user) => {
    const res = await axios.get("/api/getAllWords", user);
    return res;
}

const getTts = async (params) => {
    const res = await axios.get("/tts", params);
    return res;
}

const postWord = async (user) => {
    const res = await axios.post("/postWord", user);
    return res;
}

const postAdmin = async (user) => {
    const res = await axios.post("/api/postAdmin", user);
    return res;
}
export {
    signin,
    signup,
    hasSignedIn,
    signout,
    getAllWords,
    postWord,
    postAdmin,
    getTts,
}