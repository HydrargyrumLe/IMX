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

## 设计思路

- **数据层分离**：`js/data.js` 只负责 localStorage 读写与预设数据，两个页面共用同一份数据逻辑，视图代码不碰存储细节
- **双页面联动**：通讯录页写入 → 终端页读取，靠 localStorage 同源共享实现
- **事件委托**：列表项和详情弹窗按钮都是动态渲染的，监听器绑定在从不重建的父容器（`#contactList`、`#detailPanel`）上，用 `closest()` 定位实际点击的目标
- **数据与 DOM 的桥梁**：列表行渲染时用 `data-id` 属性携带联系人 id，点击时通过 `dataset.id` 找回数据对象
- **弹窗复用**：添加/编辑共用同一个表单弹窗，靠 `editingId` 状态变量区分两种模式（null=新增，有值=编辑）
- **命令解析**：终端输入按空格拆词（`split` + `filter`），`parts[0]` 统一分发命令、`parts[1]` 作参数，支撑带参数命令（如 `contact <名字>`）
- **可讲细节**：`hidden` 属性控制弹窗显隐、`Number()` 处理 dataset 的字符串、`preventDefault()` 拦截表单刷新、`trim()` 防空白输入
- **主题系统**：颜色全部走 CSS 变量，`data-theme` 属性切换整套变量值，localStorage 记忆
- **伪元素装饰**：详情弹窗角标、welcome back 横线都用 `::before`/`::after` 实现，不依赖 HTML 元素
- **欢迎动画**：纯 CSS 关键帧（门板宽度收缩揭字），`document.referrer` 区分"刷新"与"从通讯录切回"

## 已实现

- 终端命令：`help` / `about` / `ls` / `contact <名字>` / `clear`（未知命令报错、空输入忽略；clear 后欢迎语复位）
- 通讯录：列表渲染、添加、编辑、详情弹窗、删除（confirm 确认）、悬浮预览（悬停列表行显示头像与简介）
- 弹窗交互：取消按钮、点击背景关闭、Esc 关闭；详情弹窗玻璃质感（半透明 + 毛玻璃 + 角标装饰）与弹出/收起动画（clip-path 横向展开）
- 主题切换：深/浅两套 CSS 变量 + `data-theme` 属性切换，localStorage 记忆，两页同步
- 欢迎动画：终端页首次进入/刷新时播放（黄色门板滑动揭字），点击或空格关闭；从通讯录切回不播放（`document.referrer` 判断）
- 数据持久化：刷新后数据保留（localStorage）

## 待完善

- 移动端测试与细节打磨
- 面试后规划：页面切换动画、头像上传、手机端预览替代方案（≤768px 时预览区隐藏）

## 使用

Live Server 打开 `index.html`，或部署 GitHub Pages 后直接访问。
