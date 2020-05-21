import Axios from "axios";

async function isLogin() {
  try {
    let result = await Axios({
      method: "get",
      url: process.env.REACT_APP_API_URL + "/islogin",
      withCredentials: true,
      timeout: 300, // TODO: remove this
    });
    return result.data;
  } catch (e) {
    console.error(
      "Api server take to much time to respond, start offline mode log : ",
      e
    );
    return false;
  }
}

export default isLogin;
