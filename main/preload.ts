

// Preload (Isolated World)
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'electron',
  {
    doThing: (response, resourceName) => ipcRenderer.invoke('do-a-thing', response, resourceName)
  }
  
)