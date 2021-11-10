import axios from 'axios'

export const createHttp = (cookie, { baseURL, httpsAgent }) => {
  const http = axios.create({
    baseURL,
    httpsAgent,
    headers: {
      cookie,
      Accept: '*/*',
      Connection: 'keep-alive',
    },
    proxy: {
      protocol: 'http',
      host: '127.0.0.1',
      port: 7890,
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
  }

  http.interceptors.response.use(onFulfilled, onRejected)

  return http
}