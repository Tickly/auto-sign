
export default class SignTask {
  constructor({ id, name }) {
    this.id = id
    this.name = name
    this.signed = false

    this.http = this.createHttp()
  }

  /**
   * @returns {import("axios").AxiosInstance}
   */
  createHttp() {
    
  }

  setCookie(cookie) {
    this.http.defaults.headers.cookie = cookie
  }

  /**
   * 判断是否签到
   * @returns {Promise<Boolean>}
   */
  check() {

  }

  /**
   * 签到
   * 成功可以返回一些信息，比如第几个签到
   * 失败可以返回原因
   * @returns {Promise}
   */
  sign() {

  }

  // /** 未签到 */
  // static unsigned = 0
  // /** 已签到 */
  // static signed = 1
}