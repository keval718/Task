import Axios from "axios";

export async function getUsers() {
  const res = await Axios.get("https://treasure1.herokuapp.com/users");
  const users = res.data;
  return users;
}
