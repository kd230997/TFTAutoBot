import { app, BrowserWindow } from "electron";
import path from 'path';

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });
  win.webContents.openDevTools();

  win.loadFile(path.join(__dirname, 'index.html'));
};

app.whenReady().then(createWindow);
app.on("activate", () => {
  // On macOS it's common to re-create a window in the
  // app when the dock icon is clicked and there are no
  // other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
