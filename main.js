'use strict'

const electron = require('electron')
const {app, BrowserWindow} = electron

let mainWindow = null

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 650,
        frame: true,
        resizable: true
    })
    mainWindow.loadURL(`file://${__dirname}/app/index.html`)
    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    })
})
