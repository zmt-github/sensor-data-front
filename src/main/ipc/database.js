/*
 * @Description: 数据库操作
 * @Author: zmt
 * @Date: 2021-10-08 10:19:05
 * @LastEditors: zmt
 * @LastEditTime: 2021-10-11 11:06:03
 */
import { ipcMain } from 'electron'
import { connect, query, close, importExcel, exportExcel } from '../database/index'
/**
 * @description数据库操作
 * @param {BrowserWindow} mainWindow
 */
export function ipc (mainWindow) {
  // 链接数据库
  ipcMain.on('connect', async (event, type, from) => {
    try {
      await connect(type, from)
      mainWindow.webContents.send('connect', { code: 1, msg: `${type}链接成功`, result: null })
    } catch (err) {
      console.warn(err)
      mainWindow.webContents.send('connect', { code: 0, msg: `${type}链接失败`, result: err })
    }
  })

  // 数据库语句操作
  ipcMain.on('query', async (event, type, sign, querySql) => {
    try {
      const result = await query(type, sign, querySql)
      mainWindow.webContents.send('query', { code: 1, msg: `${type}-语句执行成功`, result: result })
    } catch (err) {
      console.warn(err)
      mainWindow.webContents.send('query', { code: 0, msg: `${type}-语句执行失败`, result: err })
    }
  })

  // 断开数据库
  ipcMain.on('close', async (event, type) => {
    try {
      await close(type)
      mainWindow.webContents.send('close', { code: 1, msg: `${type}-断开链接成功`, result: null })
    } catch (err) {
      console.warn(err)
      mainWindow.webContents.send('close', { code: 0, msg: `${type}-断开链接失败`, result: err })
    }
  })

  // excel导入数据库
  ipcMain.on('importExcel', async (event, type, tabledName) => {
    try {
      const res = await importExcel(type, tabledName)
      mainWindow.webContents.send('importExcel', { code: 1, msg: `${type}-excel导入成功`, result: res })
    } catch (err) {
      console.warn(err)
      mainWindow.webContents.send('importExcel', { code: 1, msg: `${type}-excel导入失败`, result: err })
    }
  })

  // 数据库导出为excel
  ipcMain.on('exportExcel', async (event, type, tabledName) => {
    try {
      const res = await exportExcel(type, tabledName)
      mainWindow.webContents.send('exportExcel', { code: 1, msg: `${type}-excel导出成功`, result: res })
    } catch (err) {
      console.warn(err)
      mainWindow.webContents.send('exportExcel', { code: 1, msg: `${type}-excel导出成功`, result: err })
    }
  })
}