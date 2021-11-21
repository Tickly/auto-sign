import axios from 'axios'
// import SocksProxyAgent from 'socks-proxy-agent'

const host = '127.0.0.1'
const port = 7890

export const createHttp = (cookie, { baseURL }) => {
  const http = axios.create({
    baseURL,
    // httpsAgent: new SocksProxyAgent(`socks5://${host}:${port}`),
    headers: {
      cookie,
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
    },
    proxy: {
      protocol: 'http',
      host,
      port,
    }
  })

  http.interceptors.request.use(config => {
    console.log('request')
    console.log(config.url)
    return config
  })

  const onFulfilled = value => {
    console.log(value.headers)
    console.log(value.data)
    console.log(value.status)
    return value.data
  }
  const onRejected = error => {
    console.log(error)
    throw error
  }

  http.interceptors.response.use(onFulfilled, onRejected)

  return http
}