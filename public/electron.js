const { app, BrowserWindow, ipcMain, Tray } = require("electron");
const { autoUpdater } = require("electron-updater");
const isDev = require("electron-is-dev");
const path = require("path");
require("dotenv").config();

// const {
// default: installExtension,
// REACT_DEVELOPER_TOOLS
// } = require("electron-devtools-installer");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let window;
let tray;
const iconPath = path.join(__dirname, "test.png")

const getWindowPosition = () => {
  const windowBounds = window.getBounds();
  const trayBounds = tray.getBounds();

  // Center window horizontally below the tray icon
  const x = Math.round(
    trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
  );

  const y = Math.round(trayBounds.y + trayBounds.height + 4);

  return { x, y };
};

const showWindow = () => {
  const position = getWindowPosition();
  window.setPosition(position.x, position.y, false);
  window.show();
  window.focus();
};

const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide();
  } else {
    showWindow();
  }
};

const createTray = () => {
  tray = new Tray(iconPath);
  tray.on("right-click", toggleWindow);
  tray.on("double-click", toggleWindow);
  tray.on("click", event => {
    toggleWindow();

    if (window.isVisible() && process.defaultApp && event.metaKey) {
      window.openDevTools({
        mode: "detach"
      });
    }
  });
};

function createWindow() {
  // Check for software updates
  autoUpdater.checkForUpdates();

  // Create the browser window.
  window = new BrowserWindow({
    // titleBarStyle: "hidden",
    width: 360,
    height: 354,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: false,
    icon: path.join(__dirname, "../public/icons/png/64x64.png"),
    webPreferences: {
      backgroundThrottling: false,
      webSecurity: false
    },
    show: false
  });
  window.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // mainWindow.webContents.openDevTools();
  window.openDevTools({
    mode: "detach"
  });
  // React DevTools
  // installExtension(REACT_DEVELOPER_TOOLS)
  // .then(name => console.log(`Added Extension:  ${name}`))
  // .catch(err => console.log("An error occurred: ", err));

  //window.once("ready-to-show", () => {
 //   window.show();
  //});

  // Prompt users before window close
  // mainWindow.on("close", e => {
  //   e.preventDefault();
  // });
  window.on("blur", () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide();
    }
  });
  // Emitted when the window is closed.
  window.on("closed", () => {
    window = null;
  });
}

// Don't show in doc
app.dock.hide();

app.on("ready", () => {
  createTray();
  createWindow();
});

ipcMain.on("show-window", () => {
  showWindow();
});
//-------------------------------------------------------------------
// Auto updates
//-------------------------------------------------------------------
const sendStatusToWindow = text => {
  if (tray) {
    tray.webContents.send("auto-update", text);
  }
};

autoUpdater.on("checking-for-update", () => {
  sendStatusToWindow("Checking for update...");
});
autoUpdater.on("update-available", info => {
  sendStatusToWindow("Update available.");
});
autoUpdater.on("update-not-available", info => {
  sendStatusToWindow("Update not available.");
});
autoUpdater.on("error", err => {
  sendStatusToWindow(`Error in auto-updater: ${err.toString()}`);
});
autoUpdater.on("download-progress", progressObj => {
  sendStatusToWindow(
    `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${
      progressObj.percent
    }% (${progressObj.transferred} + '/' + ${progressObj.total} + )`
  );
});
autoUpdater.on("update-downloaded", info => {
  sendStatusToWindow("Update downloaded; will install now");
});

autoUpdater.on("update-downloaded", info => {
  // Wait 5 seconds, then quit and install
  // In your application, you don't need to wait 500 ms.
  // You could call autoUpdater.quitAndInstall(); immediately
  autoUpdater.quitAndInstall();
});
