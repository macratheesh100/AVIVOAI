import axios from "axios";

const API_URL = "https://dummyjson.com/users";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    if (response.status === 200) {
        console.log("Users", response);
        return response.data.users;
    }
  } catch (error) {
    if (error.response && error.response.status === 500) {
        console.error("Error fetching Users Data:", error.message);
    }
  }
  return [];
};
