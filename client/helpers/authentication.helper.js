const authenticationHelper = {
  isAuthenticated() {
    if (typeof window == "undefined")
      return false

    if (sessionStorage.getItem('jsonWebToken'))
      return JSON.parse(sessionStorage.getItem('jsonWebToken'))
    else
      return false
  },
  authenticate(jsonWebToken, callback) {
    if (typeof window !== "undefined")
      sessionStorage.setItem('jsonWebToken', JSON.stringify(jsonWebToken))
    callback()
  },
  signout(callback) {
    if (typeof window !== "undefined")
      sessionStorage.removeItem('jsonWebToken')
    callback()
  }
}

export default authenticationHelper
