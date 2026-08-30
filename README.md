# 个人网站（终端风格）

实验室面试用个人项目。纯 HTML/CSS/JS，无框架、无构建工具。

## 页面

| 页面 | 文件 | 功能 |
|------|------|------|
| 终端主页 | `index.html` | 终端风格交互界面，敲命令查看个人信息 |
| 通讯录 | `contacts.html` | 个人简介管理（增删改查），数据存 localStorage |

## 数据流

```
contacts.html 编辑通讯录 → localStorage → index.html 终端的 about/ls 命令读取
```

## 使用

Live Server 打开 `index.html`，或部署 GitHub Pages 后直接访问。
