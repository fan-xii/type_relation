# 洛克王国世界 - 属性克制查询

一个基于 Electron 的桌面应用，用于查询《洛克王国世界》中 18 种元素属性之间的克制关系。

## 功能特性

- **18 种元素属性**：普通、草、火、水、光、地、冰、龙、电、毒、虫、武、翼、萌、幽、恶、机械、幻
- **克制关系查询**：点击任意属性，查看其克制、被克制、抵抗、被抵抗及免疫关系
- **伤害倍率显示**：×2（克制）、×0.5（抵抗）
- **暗色主题**：护眼的深色界面设计
- **纯前端实现**：零外部运行时依赖，启动即用

## 快速开始

### 环境要求

- [Node.js](https://nodejs.org/)（建议 v16 或更高版本）

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/fan-xii/type_relation.git
cd type_relation

# 安装依赖
npm install

# 启动应用
npm start
```

### 打包构建

```bash
npm run build
```

构建产物将输出到 `dist/` 目录，生成 Windows 安装包（.exe）。

## 项目结构

```
type_relation/
├── main.js              # Electron 主进程
├── preload.js           # 预加载脚本
├── package.json
└── renderer/
    ├── index.html        # 页面入口
    ├── style.css         # 样式
    ├── typeData.js       # 属性数据与克制表
    ├── app.js            # 界面逻辑
    └── icons/            # 18 种属性图标
```

## 技术栈

- **Electron** — 跨平台桌面应用框架
- **HTML / CSS / JavaScript** — 原生前端，无框架依赖

## 许可证

MIT
