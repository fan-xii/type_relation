const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');
const { version } = require('./package.json');

app.setPath('userData', path.join(__dirname, 'userData'));

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 720,
    minWidth: 640,
    minHeight: 620,
    title: '洛克王国世界 - 属性克制查询',
    icon: path.join(__dirname, 'assets', 'app_icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  const menuTemplate = [
    {
      label: '文件',
      submenu: [
        { label: '退出', accelerator: 'Alt+F4', click: () => app.quit() }
      ]
    },
    {
      label: '视图',
      submenu: [
        { role: 'reload', label: '刷新' },
        { role: 'toggleDevTools', label: '开发者工具' }
      ]
    },
    {
      label: '帮助',
      submenu: [
        {
          label: '关于',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: '关于',
              message: '洛克王国世界 - 属性克制查询工具',
              detail: `版本 ${version}\n基于《洛克王国世界》游戏属性克制关系制作。\n数据来源：游戏官方论坛及玩家社区。`
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});