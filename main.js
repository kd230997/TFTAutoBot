const { app, BrowserWindow } = require("electron");

const path = require("node:path");

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 1600,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      devTools: true,
      contextIsolation: false
    },
  });
  win.webContents.openDevTools();

  win.loadFile("index.html");
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
