/*
 * @Description: 当前数据库类型， 链接状态
 * @Author: zmt
 * @Date: 2021-09-26 16:33:11
 * @LastEditors: zmt
 * @LastEditTime: 2021-10-15 08:34:40
 */
export default {
  state: {
    Oracle: false,
    MySQL: false,
    SQLite: false,
    currentDataBase: 'MySQL',
    forwardLogin: false
  },

  mutations: {
    setOracleIsLogin (state, isLogin) {
      state.Oracle = isLogin
    },

    setMysqlIsLogin (state, isLogin) {
      state.MySQL = isLogin
    },

    setSqliteIsLogin (state, isLogin) {
      state.SQLite = isLogin
    },

    setCurrentDataBase (state, type) {
      state.currentDataBase = type
    },

    setForwardLogin (state, forwardLogin) {
      state.forwardLogin = forwardLogin
    }
  },

  actions: {
    actionOracleIsLogin ({ commit }, isLogin) {
      commit('setOracleIsLogin', isLogin)
    },
    actionMysqlIsLogin ({ commit }, isLogin) {
      commit('setMysqlIsLogin', isLogin)
    },
    actionSqliteIsLogin ({ commit }, isLogin) {
      commit('setSqliteIsLogin', isLogin)
    },
    actionForwardLogin ({ commit }, isLogin) {
      commit('setForwardLogin', isLogin)
    },
    actionSqlIsLogin ({ commit }, obj) {
      const { type, value: isLogin } = obj
      switch (type) {
        case 'MySQL' : commit('setMysqlIsLogin', isLogin)
          break
        case 'Oracle' : commit('setOracleIsLogin', isLogin)
          break
        case 'SQLite' : commit('setSqliteIsLogin', isLogin)
          break
        default : commit('setMysqlIsLogin', isLogin)
      }
    },
    actionCurrentDataBase ({ commit }, type) {
      commit('setCurrentDataBase', type)
    },
    actionClearAllState ({ commit }) {
      commit('setOracleIsLogin', false)
      commit('setMysqlIsLogin', false)
      commit('setSqliteIsLogin', false)
      commit('setCurrentDataBase', 'MySQL')
    }
  }
}
