import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://amazon-api-deploy-9l75.onrender.com"
});
export {axiosInstance}
