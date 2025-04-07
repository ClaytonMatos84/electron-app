const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            preload: `${__dirname}/app/js/preload.js`,
        },
    });

    win.loadURL(`file://${__dirname}/app/index.html`);
    if (process.env.NODE_ENV !== 'production') {
        win.webContents.openDevTools({ mode: 'detach' });
    }
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
