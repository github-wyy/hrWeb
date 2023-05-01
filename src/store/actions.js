import * as Types from './mutation-types' /*  必须有“./” */
export default {
  login ({ commit }, data) {
    commit(Types.USER_LOGIN, data)
  },
  image ({ commit }, photo) {
    commit(Types.USER_PHOTO, photo)
  },
  logout ({commit}) {
    commit(Types.USER_LOGOUT)
  },
  check ({commit}) {
    commit(Types.CHECK_LOGIN)
  },
  jwt ({ commit }, jwtToken) {
    commit(Types.JWT_TOKEN, jwtToken)
  },
  jwtHeader ({ commit }, headerName) {
    commit(Types.JWT_HEADER, headerName)
  },
  getToken ({ commit }) {
    commit(Types.GET_TOKEN)
  },
  refreshToken ({ commit }, token) {
    commit(Types.REFRESH_TOKEN, token)
  }
}
