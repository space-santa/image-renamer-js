const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    // the webPreferences hack is necessary because of this: https://github.com/webpack/webpack/issues/10035#issuecomment-864497801
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 800,
    height: 600,
  });

  win.loadFile(path.join(__dirname, "dist", "image-renamer-js", "index.html"));
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
