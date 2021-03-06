/*
 * @Description: vuex getters
 * @Author: zmt
 * @Date: 2021-09-26 16:37:42
 * @LastEditors: zmt
 * @LastEditTime: 2021-10-15 08:40:20
 */

export default {
  Oracle: state => state.type.Oracle,
  MySQL: state => state.type.MySQL,
  SQLite: state => state.type.SQLite,
  currentDataBase: state => state.type.currentDataBase,
  currentTableName: state => state.sql.currentTableName,
  forwardLogin: state => state.sql.forwardLogin
}
