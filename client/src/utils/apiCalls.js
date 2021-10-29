import axios from "axios";

export const loginCall = async (userCredentials) => {
  try {
    await axios.post("login", userCredentials);
  } catch (err) {

  }
};