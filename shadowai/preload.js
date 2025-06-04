const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('shadow', {
  acceptConsent: () => ipcRenderer.invoke('accept-consent'),
  startTraining: () => ipcRenderer.invoke('start-training'),
  stopTraining: () => ipcRenderer.invoke('stop-training'),
  startReplay: () => ipcRenderer.invoke('start-replay'),
  stopReplay: () => ipcRenderer.invoke('stop-replay'),
  startMimic: () => ipcRenderer.invoke('start-mimic'),
  stopMimic: () => ipcRenderer.invoke('stop-mimic'),
  onPredict: cb => ipcRenderer.on('predict', (_, pos) => cb(pos.x, pos.y))
});
