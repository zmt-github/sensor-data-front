'use strict'

import { app, protocol, BrowserWindow, dialog } from 'electron'
import { registerIpcMain } from './main/ipc'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'

const path = require('path')
const oracle = require('oracledb')
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 480,
    width: 300,
    useContentSize: true,
    minHeight: 480,
    minWidth: 300,
    center: true,
    frame: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      nodeIntegration: true,
      // contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
      contextIsolation: false
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    await mainWindow.loadURL('app://./index.html')
  }

  try {
    if (process.env.NODE_ENV === 'production') {
      oracle.initOracleClient({ libDir: path.join(__dirname, 'instantclient_19_12') })
    } else {
      oracle.initOracleClient({ libDir: 'E:\\electron\\sensor-data-front\\public\\instantclient_19_12' })
    }
  } catch (err) {
    dialog.showMessageBoxSync({ message: err.message, type: 'error' })
    dialog.showMessageBoxSync({ message: path.join(__dirname, 'instantclient_19_12'), type: 'error' })
  }

  registerIpcMain(mainWindow)

  mainWindow.webContents.send('created')
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', async () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) await createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  // Install Vue Devtools
  //   try {
  //     await installExtension(VUEJS_DEVTOOLS)
  //   } catch (e) {
  //     console.error('Vue Devtools failed to install:', e.toString())
  //   }
  // }
  await createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
