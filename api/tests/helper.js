const axios = require('axios')

class Helper {
  static API_BASE_URL = 'http://localhost:3333'

  static async apiGet (url, options = {}) {
    return this.apiRequest({
      method: 'get',
      url,
      options
    })
  }

  static async apiPost (url, data, options = {}) {
    return this.apiRequest({
      method: 'post',
      url,
      data,
      ...options
    })
  }

  static async apiRequest (options) {
    return await axios.request({
      baseURL: this.API_BASE_URL,
      method: 'get',
      url: '',
      ...options
    })
  }
}

module.exports = Helper
