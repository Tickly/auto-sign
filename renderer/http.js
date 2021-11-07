import axios from "axios"
import config from "../config"

const http = axios.create({
  baseURL: '//localhost:' + config.port,
})


http.interceptors.response.use(res => {
  if (res.status === 200) {
    return res.data
  }

  return res
})


export default http