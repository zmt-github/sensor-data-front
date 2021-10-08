/*
 * @Description:dialog
 * @Author: zmt
 * @Date: 2021-10-08 10:40:55
 * @LastEditors: zmt
 * @LastEditTime: 2021-10-08 12:01:07
 */
import { ipcMain } from 'electron'
import { openFileSync } from '../utils/file'

/**
 * @Description打开弹框
 * @param {BrowserWindow} mainWindow
 */
export function ipc (mainWindow) {
  ipcMain.on('onDialog', (event, type, properties) => {
    const result = openFileSync(properties)
    console.log(result)
    mainWindow.webContents.send('onDialog', type, result)
  })
}