import { app, BrowserWindow, ipcMain } from 'electron';
const si = require("systeminformation");
const fs = require("fs");
const path = require("path");
const child_process = require("child_process");
const open = require("open");
const readline = require("readline");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    minWidth: 800,
    height: 1000,
    minHeight: 1000,
    backgroundColor: '#2e2c29',
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('asynchronous-message', (event, arg) => {
  var finddir = new Promise((resolve, reject) => {
    si.blockDevices(function(data){ 
        var disks = [];
        data.forEach(element => disks.push(element.name + "\\"));
        resolve(disks);
    });
});
//finddir.then(disks => console.log(disks));
finddir.then(disks => {
    disks.forEach(element => {try {child_process.exec(`chcp 65001 | WHERE /R ${element} *${arg}*`,{encoding:"utf8"},function(error,stdout,stderr){
      var mas = stdout.split("\n");
      mas.forEach(element => event.reply("asynchronous-reply",element));
   
        });} catch(err){event.reply("asynchronous-reply",err);}});
      }).catch(error => event.reply("asynchronous-reply",error));
  });
  ipcMain.on("open", (event, arg) => {child_process.exec(`start "" "${arg}"`)});
  ipcMain.on("open_path", (event, arg) => {
  var mas = arg.split("\\");
  mas.pop();
  child_process.exec(`start "" "${mas.join("\\")}"`)});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
