import axios from "axios"

export const getThisWeek = async () => {
  try {
    return await axios.get(
      "http://127.0.0.1:5000/api/week/289"
    );
  } catch (e) {
    console.log(e);
  }
  return null;
};
