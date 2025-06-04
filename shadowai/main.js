const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const fs = require('fs');
const iohook = require('iohook');
const robot = require('robotjs');

let mainWindow;
let overlayWindow;
const dataPath = app.getPath('userData');
const configPath = path.join(dataPath, 'config.json');
const eventsPath = path.join(dataPath, 'events.json');
const modelPath = path.join(dataPath, 'model.json');
let recording = [];
let replayInterval;
let mimicInterval;

function createWindow(page) {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 200,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow.loadFile(page);
}

function createOverlay() {
  const { width, height } = screen.getPrimaryDisplay().bounds;
  overlayWindow = new BrowserWindow({
    x: 0,
    y: 0,
    width,
    height,
    frame: false,
    transparent: true,
    resizable: false,
    hasShadow: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    focusable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  overlayWindow.setIgnoreMouseEvents(true);
  overlayWindow.loadFile('overlay.html');
}

app.whenReady().then(() => {
  if (fs.existsSync(configPath)) {
    createWindow('index.html');
  } else {
    createWindow('consent.html');
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('accept-consent', () => {
  fs.writeFileSync(configPath, JSON.stringify({ consent: true }));
  mainWindow.loadFile('index.html');
});

ipcMain.handle('start-training', () => {
  recording = [];
  iohook.on('mousemove', e => recording.push({ x: e.x, y: e.y, t: Date.now() }));
  iohook.on('mousedown', e => recording.push({ button: e.button, type: 'down', t: Date.now() }));
  iohook.on('mouseup', e => recording.push({ button: e.button, type: 'up', t: Date.now() }));
  iohook.start();
});

ipcMain.handle('stop-training', () => {
  iohook.stop();
  iohook.removeAllListeners();
  fs.writeFileSync(eventsPath, JSON.stringify(recording));
  let dx = 0;
  let dy = 0;
  for (let i = 1; i < recording.length; i++) {
    const prev = recording[i - 1];
    const curr = recording[i];
    if (curr.x !== undefined && prev.x !== undefined) {
      dx += curr.x - prev.x;
      dy += curr.y - prev.y;
    }
  }
  const count = recording.length - 1;
  if (count > 0) {
    fs.writeFileSync(modelPath, JSON.stringify({ dx: dx / count, dy: dy / count }));
  }
});

ipcMain.handle('start-replay', () => {
  if (!fs.existsSync(eventsPath)) return;
  const data = JSON.parse(fs.readFileSync(eventsPath));
  let i = 0;
  replayInterval = setInterval(() => {
    if (i >= data.length) {
      clearInterval(replayInterval);
    } else {
      const e = data[i];
      if (e.x !== undefined) robot.moveMouse(e.x, e.y);
      if (e.button !== undefined && e.type === 'down') robot.mouseToggle('down', e.button === 1 ? 'left' : 'right');
      if (e.button !== undefined && e.type === 'up') robot.mouseToggle('up', e.button === 1 ? 'left' : 'right');
      i++;
    }
  }, 30);
});

ipcMain.handle('stop-replay', () => {
  clearInterval(replayInterval);
});

ipcMain.handle('start-mimic', () => {
  if (!fs.existsSync(modelPath)) return;
  const model = JSON.parse(fs.readFileSync(modelPath));
  createOverlay();
  mimicInterval = setInterval(() => {
    const pos = robot.getMousePos();
    overlayWindow.webContents.send('predict', { x: pos.x + model.dx, y: pos.y + model.dy });
  }, 16);
});

ipcMain.handle('stop-mimic', () => {
  clearInterval(mimicInterval);
  if (overlayWindow) {
    overlayWindow.close();
    overlayWindow = null;
  }
});
