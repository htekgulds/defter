const {app, BrowserWindow} = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const {ipcMain} = require('electron')

const {openFile} = require('./helpers/fileHelper')

let mainWindow

ipcMain.on('open-file', (event) => {
  const file = process.argv[1]
  if (file) {
    openFile(file, (err, data) => {
      if (err) {
        event.sender.send('file-open-error', err)
        return
      }
      // If no error
      event.sender.send('file-opened', data)
    })
  }
})

function createWindow () {
  mainWindow = new BrowserWindow({width: 1024, height: 768, show: false})
  mainWindow.loadURL(isDev ? 'http://localhost:4000' : path.join('file://', __dirname, '../dist/index.html'))
  mainWindow.on('closed', () => mainWindow = null)
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})