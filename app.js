const {app, BrowserWindow} = require("electron")
const path = require('node:path'); 

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1176,
        height: 664,
        icon: path.join(__dirname,"_01db1c07-d4c9-4d7d-9f6b-52095fe5adce.jpg"),
        resizable: false,
        webPreferences: {
            nodeIntegration: true, 
            contextIsolation: false,
          }
    })
    win.setMenuBarVisibility(false)
    win.setTitle("ObjectDefinition")
    win.loadFile("index.html")
}
app.whenReady().then(() => createWindow());
app.on(`window-all-closed`,() => app.quit());
